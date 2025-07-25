const express = require('express');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Farmer = require('../models/Farmer');
const { protect, isAdmin } = require('../middleware/auth');
const AfricasTalking = require('africastalking');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(isAdmin);

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
router.get('/dashboard', async (req, res) => {
  try {
    const stats = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'admin' }),
      User.countDocuments({ role: 'farmer' }),
      User.countDocuments({ role: 'user' }),
      Order.countDocuments(),
      Order.countDocuments({ status: 'Pending' }),
      Order.countDocuments({ status: 'Processing' }),
      Order.countDocuments({ status: 'Delivered' }),
      Product.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Farmer.countDocuments(),
      Farmer.countDocuments({ isVerified: true })
    ]);

    // Calculate total revenue
    const revenueResult = await Order.aggregate([
      { $match: { status: { $in: ['Delivered', 'Processing', 'Shipped'] } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Get recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .populate('farmer', 'farmName')
      .populate('product', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers: stats[0],
          totalAdmins: stats[1],
          totalFarmers: stats[2],
          totalCustomers: stats[3],
          totalOrders: stats[4],
          pendingOrders: stats[5],
          processingOrders: stats[6],
          deliveredOrders: stats[7],
          totalProducts: stats[8],
          activeProducts: stats[9],
          totalFarmers: stats[10],
          verifiedFarmers: stats[11],
          totalRevenue
        },
        recentOrders
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard stats',
      error: error.message
    });
  }
});

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
router.get('/orders', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const status = req.query.status;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate('user', 'name email phone')
      .populate('farmer', 'farmName user')
      .populate({
        path: 'farmer',
        populate: { path: 'user', select: 'name phone' }
      })
      .populate('product', 'name category')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(startIndex);

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      count: orders.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: orders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});

// @desc    Update order status
// @route   PUT /api/admin/orders/:id/status
// @access  Private/Admin
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { status, note } = req.body;
    
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status provided'
      });
    }

    const order = await Order.findById(req.params.id)
      .populate('farmer')
      .populate({
        path: 'farmer',
        populate: { path: 'user', select: 'name phone' }
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update order status
    order.status = status;
    if (note) {
      order.notes.adminNotes = note;
    }

    // Add to status history
    order.statusHistory.push({
      status,
      timestamp: new Date(),
      note,
      updatedBy: req.user._id
    });

    await order.save();

    // Send SMS notification to farmer if status is Processing
    if (status === 'Processing' && order.farmer && order.farmer.user) {
      try {
        await sendSmsToFarmer(order);
      } catch (smsError) {
        console.error('SMS sending failed:', smsError);
        // Don't fail the whole request if SMS fails
      }
    }

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      data: order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    });
  }
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const role = req.query.role;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = {};
    if (role && role !== 'all') {
      query.role = role;
    }

    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip(startIndex);

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      count: users.length,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
});

// @desc    Toggle user active status
// @route   PUT /api/admin/users/:id/toggle-status
// @access  Private/Admin
router.put('/users/:id/toggle-status', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Don't allow deactivation of admin users
    if (user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot deactivate admin users'
      });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: user
    });
  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user status',
      error: error.message
    });
  }
});

// @desc    Get all farmers
// @route   GET /api/admin/farmers
// @access  Private/Admin
router.get('/farmers', async (req, res) => {
  try {
    const farmers = await Farmer.find()
      .populate('user', 'name email phone isActive')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: farmers.length,
      data: farmers
    });
  } catch (error) {
    console.error('Get farmers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching farmers',
      error: error.message
    });
  }
});

// @desc    Send SMS to farmer
// @route   POST /api/admin/sms/farmer
// @access  Private/Admin
router.post('/sms/farmer', async (req, res) => {
  try {
    const { farmerId, message, phone } = req.body;

    if (!message || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Message and phone number are required'
      });
    }

    const result = await sendSms(phone, message);

    res.status(200).json({
      success: true,
      message: 'SMS sent successfully',
      data: result
    });
  } catch (error) {
    console.error('Send SMS error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending SMS',
      error: error.message
    });
  }
});

// Helper function to send SMS to farmer
const sendSmsToFarmer = async (order) => {
  try {
    if (!process.env.AFRICASTALKING_API_KEY || !process.env.AFRICASTALKING_USERNAME) {
      console.log('⚠️ SMS not configured - skipping farmer notification');
      return;
    }

    const message = `🌾 AgriTech Order Alert!
New order received:
Product: ${order.orderDetails.productName}
Quantity: ${order.orderDetails.quantity} ${order.orderDetails.unit}
Customer: ${order.customerInfo.name}
Phone: ${order.customerInfo.phone}
Delivery: ${order.customerInfo.deliveryAddress.city}, ${order.customerInfo.deliveryAddress.state}
Order ID: #${order.orderNumber}
Please prepare for delivery. Thank you!`;

    const phone = order.farmer.user.phone;
    await sendSms(phone, message);

    // Update order with SMS notification
    order.addSmsNotification('farmer', phone, message);
    await order.save();

    console.log(`✅ SMS sent to farmer: ${phone}`);
  } catch (error) {
    console.error('❌ Failed to send SMS to farmer:', error);
    throw error;
  }
};

// Helper function to send SMS
const sendSms = async (phone, message) => {
  try {
    const africastalking = AfricasTalking({
      apiKey: process.env.AFRICASTALKING_API_KEY,
      username: process.env.AFRICASTALKING_USERNAME
    });

    const sms = africastalking.SMS;
    
    const result = await sms.send({
      to: phone,
      message: message,
      from: 'AgriTech'
    });

    return result;
  } catch (error) {
    console.error('SMS sending error:', error);
    throw new Error('Failed to send SMS: ' + error.message);
  }
};

module.exports = router;

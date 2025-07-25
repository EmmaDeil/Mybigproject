import React from 'react';
import OrderManagement from './OrderManagement';

const OrdersPage = ({ cartItems }) => {
  return (
    <div className="w-[100%] bg-gradient" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
      <div className="w-100 min-vh-100">
        {/* Header Section */}
        <div className="bg-success text-white py-5 w-100">
          <div className="container-fluid px-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h1 className="display-4 mb-3">📦 Order Management</h1>
                <p className="lead mb-0">Track, manage, and monitor all your farm produce orders</p>
              </div>
              <div className="col-md-4 text-md-end">
                <div className="d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
                  <div className="text-center me-4">
                    <h3 className="mb-1">{cartItems.length}</h3>
                    <small>Active Cart Items</small>
                  </div>
                  <div className="text-center">
                    <h3 className="mb-1">₦{cartItems.reduce((total, item) => total + (item.price * (item.quantity || item.orderQuantity || 1)), 0).toLocaleString()}</h3>
                    <small>Cart Total</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Full Width */}
        <div className="container-fluid px-4 py-4 w-100">
          <OrderManagement />
        </div>

        {/* Footer Section */}
        <div className="bg-success text-white py-3 mt-auto w-100">
          <div className="container-fluid px-4">
            <div className="row align-items-center">
              <div className="col-md-6">
                <small>© 2025 AgriTech Farm Store - Order Management System</small>
              </div>
              <div className="col-md-6 text-md-end">
                <small>Need help? Contact support: +234 800 AGRI TECH</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

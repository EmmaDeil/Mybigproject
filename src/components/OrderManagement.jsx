import React, { useState } from 'react';
import { Card, Table, Badge, Button, Modal, Form, Row, Col, Alert } from 'react-bootstrap';

function OrderManagement() {
  const [activeView, setActiveView] = useState('pending');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('');

  const orders = [
    {
      id: 'ORD-001',
      customer: 'Mrs. Folake Adeyemi',
      phone: '08012345678',
      email: 'folake@email.com',
      products: [
        { name: 'Fresh Tomatoes', quantity: 5, unit: 'kg', price: 2500 },
        { name: 'Fresh Pepper', quantity: 2, unit: 'kg', price: 3500 }
      ],
      total: 19500,
      status: 'pending',
      orderDate: '2025-01-15',
      deliveryAddress: '12 Ikeja Avenue, Lagos',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'ORD-002',
      customer: 'Mr. Chike Okafor',
      phone: '08087654321',
      email: 'chike@email.com',
      products: [
        { name: 'White Rice', quantity: 10, unit: 'kg', price: 1200 }
      ],
      total: 12500,
      status: 'processing',
      orderDate: '2025-01-14',
      deliveryAddress: '45 University Road, Nsukka',
      paymentMethod: 'Mobile Money'
    },
    {
      id: 'ORD-003',
      customer: 'Ms. Aisha Muhammad',
      phone: '08056789012',
      email: 'aisha@email.com',
      products: [
        { name: 'Yellow Maize', quantity: 25, unit: 'kg', price: 800 },
        { name: 'Groundnuts', quantity: 5, unit: 'kg', price: 2800 }
      ],
      total: 34500,
      status: 'delivered',
      orderDate: '2025-01-12',
      deliveryAddress: '78 Ahmadu Bello Way, Kaduna',
      paymentMethod: 'Cash on Delivery'
    },
    {
      id: 'ORD-004',
      customer: 'Dr. Emmanuel Okoro',
      phone: '08034567890',
      email: 'emmanuel@email.com',
      products: [
        { name: 'Sweet Potatoes', quantity: 8, unit: 'kg', price: 1800 },
        { name: 'Plantains', quantity: 12, unit: 'kg', price: 1500 }
      ],
      total: 32900,
      status: 'cancelled',
      orderDate: '2025-01-13',
      deliveryAddress: '23 Independence Layout, Enugu',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'ORD-005',
      customer: 'Mrs. Kemi Babatunde',
      phone: '08078901234',
      email: 'kemi@email.com',
      products: [
        { name: 'Garden Eggs', quantity: 3, unit: 'kg', price: 2200 },
        { name: 'Fresh Okra', quantity: 4, unit: 'kg', price: 1800 }
      ],
      total: 13600,
      status: 'pending',
      orderDate: '2025-01-15',
      deliveryAddress: '67 Ring Road, Ibadan',
      paymentMethod: 'Mobile Money'
    }
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'delivered': return 'success';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'processing': return '🔄';
      case 'delivered': return '✅';
      case 'cancelled': return '❌';
      default: return '📦';
    }
  };

  const filteredOrders = orders.filter(order => 
    activeView === 'all' ? true : order.status === activeView
  );

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const handleStatusChange = (newStatus) => {
    // In a real app, this would update the backend
    setStatusUpdate(`Order ${selectedOrder.id} status updated to ${newStatus}`);
    setShowDetailModal(false);
    setTimeout(() => setStatusUpdate(''), 3000);
  };

  const orderCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  return (
    <div className="" style={{ minHeight: 'calc(100vh - 200px)', width: '100%' }}>
      {statusUpdate && (
        <Alert variant="success" className="mb-4">
          {statusUpdate}
        </Alert>
      )}

      {/* Order Status Filter - Full Desktop Width */}
      <div className="mb-5">
        <div className="row g-3">
          {Object.entries(orderCounts).map(([status, count]) => (
            <div key={status} className="col-xl-2 col-lg-2 col-md-4 col-sm-6">
              <div 
                className={`text-center p-4 rounded cursor-pointer border-2 shadow-sm ${activeView === status ? 'bg-success text-white border-success' : 'bg-white border-light hover-shadow'}`}
                onClick={() => setActiveView(status)}
                style={{ 
                  cursor: 'pointer', 
                  minHeight: '120px',
                  transition: 'all 0.3s ease',
                  fontSize: '1rem'
                }}
              >
                <div className="display-6 mb-2 fw-bold">{count}</div>
                <div className="text-capitalize fw-medium">
                  <span style={{ fontSize: '1.5rem' }} className="me-2">{getStatusIcon(status)}</span>
                  {status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orders Table - Full Desktop Width */}
      <div className="w-100 bg-white rounded-3 shadow-lg border-0">
        <div className="bg-gradient-success text-white p-4 rounded-top">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1 fw-bold">
                <i className="fas fa-clipboard-list me-3"></i>
                {activeView === 'all' ? 'All Orders' : `${activeView.charAt(0).toUpperCase() + activeView.slice(1)} Orders`}
              </h2>
              <p className="mb-0 opacity-75">Manage and track your farm produce orders efficiently</p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="badge bg-white text-success fs-5 px-3 py-2">{filteredOrders.length} orders</span>
              <button className="btn btn-light btn-lg">
                <i className="fas fa-sync-alt me-2"></i>Refresh Data
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0" style={{ minHeight: '500px', fontSize: '1rem' }}>
              <thead className="bg-light" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                <tr>
                  <th className="py-4 px-4 fw-bold text-uppercase" style={{ minWidth: '120px' }}>Order ID</th>
                  <th className="py-4 px-4 fw-bold text-uppercase" style={{ minWidth: '200px' }}>Customer</th>
                  <th className="py-4 px-4 fw-bold text-uppercase" style={{ minWidth: '250px' }}>Products</th>
                  <th className="py-4 px-4 fw-bold text-uppercase" style={{ minWidth: '120px' }}>Total</th>
                  <th className="py-4 px-4 fw-bold text-uppercase" style={{ minWidth: '120px' }}>Status</th>
                  <th className="py-4 px-4 fw-bold text-uppercase" style={{ minWidth: '120px' }}>Date</th>
                  <th className="py-4 px-4 fw-bold text-uppercase" style={{ minWidth: '150px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} style={{ height: '100px' }} className="border-bottom">
                    <td className="fw-bold align-middle px-4" style={{ fontSize: '1.1rem', color: '#2c3e50' }}>
                      {order.id}
                    </td>
                    <td className="align-middle px-4">
                      <div className="fw-bold mb-1" style={{ fontSize: '1.1rem' }}>{order.customer}</div>
                      <small className="text-muted d-flex align-items-center">
                        <i className="fas fa-phone me-1"></i>{order.phone}
                      </small>
                    </td>
                    <td className="align-middle px-4">
                      <div>
                        {order.products.map((product, idx) => (
                          <div key={idx} className="mb-2 d-flex align-items-center">
                            <span className="badge bg-success text-white me-2 px-2 py-1" style={{ fontSize: '0.9rem' }}>
                              {product.quantity} {product.unit}
                            </span>
                            <span style={{ fontSize: '1rem' }}>{product.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="fw-bold text-success align-middle px-4" style={{ fontSize: '1.3rem' }}>
                      ₦{order.total.toLocaleString()}
                    </td>
                    <td className="align-middle px-4">
                      <span className={`badge bg-${getStatusVariant(order.status)} px-3 py-2`} style={{ fontSize: '1rem' }}>
                        <span style={{ fontSize: '1.2rem' }} className="me-1">{getStatusIcon(order.status)}</span>
                        {order.status}
                      </span>
                    </td>
                    <td className="text-muted align-middle px-4" style={{ fontSize: '1rem' }}>
                      <i className="fas fa-calendar me-1"></i>
                      {order.orderDate}
                    </td>
                    <td className="align-middle px-4">
                      <button
                        className="btn btn-primary btn-lg px-4"
                        onClick={() => handleViewDetails(order)}
                        style={{ fontSize: '1rem' }}
                      >
                        <i className="fas fa-eye me-2"></i>View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details - {selectedOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <Row>
              <Col md={6}>
                <h6 className="text-primary mb-3">Customer Information</h6>
                <div className="mb-3">
                  <strong>Name:</strong> {selectedOrder.customer}<br/>
                  <strong>Phone:</strong> {selectedOrder.phone}<br/>
                  <strong>Email:</strong> {selectedOrder.email}<br/>
                  <strong>Address:</strong> {selectedOrder.deliveryAddress}
                </div>
                
                <h6 className="text-primary mb-3">Order Information</h6>
                <div className="mb-3">
                  <strong>Order Date:</strong> {selectedOrder.orderDate}<br/>
                  <strong>Payment Method:</strong> {selectedOrder.paymentMethod}<br/>
                  <strong>Current Status:</strong> 
                  <Badge bg={getStatusVariant(selectedOrder.status)} className="ms-2">
                    {getStatusIcon(selectedOrder.status)} {selectedOrder.status}
                  </Badge>
                </div>
              </Col>
              
              <Col md={6}>
                <h6 className="text-primary mb-3">Products Ordered</h6>
                <Table size="sm" className="mb-3">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.products.map((product, idx) => (
                      <tr key={idx}>
                        <td>{product.name}</td>
                        <td>{product.quantity} {product.unit}</td>
                        <td>₦{product.price.toLocaleString()}</td>
                        <td>₦{(product.quantity * product.price).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="3">Total (+ ₦500 delivery)</th>
                      <th>₦{selectedOrder.total.toLocaleString()}</th>
                    </tr>
                  </tfoot>
                </Table>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="me-auto">
            <strong>Update Status:</strong>
          </div>
          <Button variant="warning" size="sm" onClick={() => handleStatusChange('processing')}>
            Mark Processing
          </Button>
          <Button variant="success" size="sm" onClick={() => handleStatusChange('delivered')}>
            Mark Delivered
          </Button>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OrderManagement;

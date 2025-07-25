import React, { useState } from 'react';
import { Card, Table, Button, Badge, Modal, Form, Row, Col, Alert } from 'react-bootstrap';

function ShoppingCart({ cartItems = [], onUpdateCart, onCheckout }) {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [checkoutAlert, setCheckoutAlert] = useState('');

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    // Update cart logic would go here
  };

  const removeFromCart = (productId) => {
    // Remove from cart logic would go here
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.totalPrice || item.price * item.orderQuantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.orderQuantity || item.quantity), 0);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const orderData = {
      customer: customerInfo,
      items: cartItems,
      total: getTotalPrice() + 500, // Add delivery fee
      orderDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    setCheckoutAlert(`Order placed successfully! Total: ₦${(getTotalPrice() + 500).toLocaleString()}`);
    setShowCheckoutModal(false);
    
    // Clear form
    setCustomerInfo({ name: '', email: '', phone: '', address: '' });
    
    // In a real app, you would clear the cart and save the order
    setTimeout(() => setCheckoutAlert(''), 5000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-5">
        <span style={{ fontSize: '4rem' }}>🛒</span>
        <h3 className="text-muted mt-3">Your cart is empty</h3>
        <p className="text-muted">Add some fresh farm products to get started!</p>
      </div>
    );
  }

  return (
    <div>
      {checkoutAlert && (
        <Alert variant="success" className="mb-4">
          {checkoutAlert}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-success">🛍️ Shopping Cart</h2>
        <Badge bg="primary" className="fs-6">
          {getTotalItems()} items
        </Badge>
      </div>

      <Card className="mb-4">
        <Card.Body className="p-0">
          <Table responsive className="mb-0">
            <thead className="bg-light">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="me-2" style={{ fontSize: '2rem' }}>{item.image}</span>
                      <div>
                        <div className="fw-medium">{item.name}</div>
                        <small className="text-muted">by {item.farmer}</small>
                      </div>
                    </div>
                  </td>
                  <td className="text-success fw-bold">
                    ₦{item.price.toLocaleString()}/{item.unit}
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, (item.orderQuantity || item.quantity) - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.orderQuantity || item.quantity} {item.unit}(s)</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, (item.orderQuantity || item.quantity) + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td className="fw-bold text-success">
                    ₦{(item.totalPrice || item.price * item.orderQuantity).toLocaleString()}
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Order Summary */}
      <Card className="mb-4">
        <Card.Header className="bg-success text-white">
          <h5 className="mb-0">Order Summary</h5>
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span className="fw-bold">₦{getTotalPrice().toLocaleString()}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Delivery Fee:</span>
            <span>₦500</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between mb-3">
            <span className="fw-bold fs-5">Total:</span>
            <span className="fw-bold fs-5 text-success">₦{(getTotalPrice() + 500).toLocaleString()}</span>
          </div>
          <Button
            variant="success"
            size="lg"
            className="w-100"
            onClick={() => setShowCheckoutModal(true)}
          >
            Proceed to Checkout
          </Button>
        </Card.Body>
      </Card>

      {/* Checkout Modal */}
      <Modal show={showCheckoutModal} onHide={() => setShowCheckoutModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCheckout}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <h6 className="text-primary mb-3">Customer Information</h6>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Delivery Address *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <h6 className="text-primary mb-3">Order Summary</h6>
                <div className="bg-light p-3 rounded">
                  {cartItems.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between mb-2">
                      <span>{item.orderQuantity || item.quantity} × {item.name}</span>
                      <span>₦{(item.totalPrice || item.price * item.orderQuantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between mb-1">
                    <span>Subtotal:</span>
                    <span>₦{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Delivery:</span>
                    <span>₦500</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total:</span>
                    <span className="text-success">₦{(getTotalPrice() + 500).toLocaleString()}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCheckoutModal(false)}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Place Order
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ShoppingCart;

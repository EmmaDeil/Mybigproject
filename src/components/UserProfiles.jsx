import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Form, Badge, Alert } from 'react-bootstrap';

function UserProfiles() {
  const [activeProfile, setActiveProfile] = useState('customer');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [updateAlert, setUpdateAlert] = useState('');

  const customerProfile = {
    id: 'CUST-001',
    name: 'Mrs. Folake Adeyemi',
    email: 'folake@email.com',
    phone: '08012345678',
    address: '12 Ikeja Avenue, Lagos State',
    joinDate: '2024-11-15',
    totalOrders: 12,
    totalSpent: 156800,
    preferredProducts: ['Tomatoes', 'Rice', 'Pepper'],
    paymentMethod: 'Bank Transfer',
    verified: true
  };

  const farmerProfile = {
    id: 'FARM-001',
    name: 'Adebayo Farms',
    owner: 'Mr. Adebayo Ogundimu',
    email: 'adebayo@farms.com',
    phone: '08087654321',
    address: 'KM 15 Lagos-Ibadan Expressway, Ogun State',
    farmSize: '25 hectares',
    joinDate: '2024-08-20',
    totalSales: 2456700,
    productsGrown: ['Tomatoes', 'Pepper', 'Cucumber', 'Okra'],
    certifications: ['Organic Farming', 'GAP Certified'],
    verified: true,
    rating: 4.8
  };

  const adminProfile = {
    id: 'ADM-001',
    name: 'AgriTech Administrator',
    email: 'admin@agritech.com',
    phone: '08012345000',
    role: 'Super Admin',
    permissions: ['User Management', 'Order Management', 'Analytics', 'System Settings'],
    lastLogin: '2025-01-15 09:30 AM',
    joinDate: '2024-06-01'
  };

  const getCurrentProfile = () => {
    switch (activeProfile) {
      case 'customer': return customerProfile;
      case 'farmer': return farmerProfile;
      case 'admin': return adminProfile;
      default: return customerProfile;
    }
  };

  const handleEditProfile = () => {
    setEditingUser(getCurrentProfile());
    setShowEditModal(true);
  };

  const handleSaveProfile = () => {
    setUpdateAlert(`${activeProfile.charAt(0).toUpperCase() + activeProfile.slice(1)} profile updated successfully!`);
    setShowEditModal(false);
    setTimeout(() => setUpdateAlert(''), 3000);
  };

  const renderCustomerProfile = () => (
    <Row>
      <Col md={4}>
        <Card className="text-center mb-4">
          <Card.Body>
            <div className="mb-3">
              <span style={{ fontSize: '4rem' }}>👩‍💼</span>
            </div>
            <h4>{customerProfile.name}</h4>
            <p className="text-muted">{customerProfile.email}</p>
            {customerProfile.verified && (
              <Badge bg="success" className="mb-2">✓ Verified Customer</Badge>
            )}
            <div className="d-grid">
              <Button variant="outline-primary" onClick={handleEditProfile}>
                Edit Profile
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={8}>
        <Card className="mb-4">
          <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">Customer Information</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col sm={6} className="mb-3">
                <strong>Phone:</strong><br/>
                <span className="text-muted">{customerProfile.phone}</span>
              </Col>
              <Col sm={6} className="mb-3">
                <strong>Member Since:</strong><br/>
                <span className="text-muted">{customerProfile.joinDate}</span>
              </Col>
              <Col sm={12} className="mb-3">
                <strong>Delivery Address:</strong><br/>
                <span className="text-muted">{customerProfile.address}</span>
              </Col>
              <Col sm={6} className="mb-3">
                <strong>Total Orders:</strong><br/>
                <span className="text-success fw-bold">{customerProfile.totalOrders}</span>
              </Col>
              <Col sm={6} className="mb-3">
                <strong>Total Spent:</strong><br/>
                <span className="text-success fw-bold">₦{customerProfile.totalSpent.toLocaleString()}</span>
              </Col>
              <Col sm={6} className="mb-3">
                <strong>Preferred Payment:</strong><br/>
                <span className="text-muted">{customerProfile.paymentMethod}</span>
              </Col>
              <Col sm={6} className="mb-3">
                <strong>Preferred Products:</strong><br/>
                <div>
                  {customerProfile.preferredProducts.map((product, idx) => (
                    <Badge key={idx} bg="light" text="dark" className="me-1 mb-1">
                      {product}
                    </Badge>
                  ))}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  const renderFarmerProfile = () => (
    <Row>
      <Col md={4}>
        <Card className="text-center mb-4">
          <Card.Body>
            <div className="mb-3">
              <span style={{ fontSize: '4rem' }}>👨‍🌾</span>
            </div>
            <h4>{farmerProfile.name}</h4>
            <p className="text-muted">{farmerProfile.owner}</p>
            <div className="mb-2">
              <span className="text-warning">⭐ {farmerProfile.rating}</span>
            </div>
            {farmerProfile.verified && (
              <Badge bg="success" className="mb-2">✓ Verified Farmer</Badge>
            )}
            <div className="d-grid">
              <Button variant="outline-success" onClick={handleEditProfile}>
                Edit Profile
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={8}>
        <Card className="mb-4">
          <Card.Header className="bg-success text-white">
            <h5 className="mb-0">Farm Information</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col sm={6} className="mb-3">
                <strong>Contact:</strong><br/>
                <span className="text-muted">{farmerProfile.phone}</span><br/>
                <span className="text-muted">{farmerProfile.email}</span>
              </Col>
              <Col sm={6} className="mb-3">
                <strong>Farm Size:</strong><br/>
                <span className="text-muted">{farmerProfile.farmSize}</span>
              </Col>
              <Col sm={12} className="mb-3">
                <strong>Location:</strong><br/>
                <span className="text-muted">{farmerProfile.address}</span>
              </Col>
              <Col sm={6} className="mb-3">
                <strong>Member Since:</strong><br/>
                <span className="text-muted">{farmerProfile.joinDate}</span>
              </Col>
              <Col sm={6} className="mb-3">
                <strong>Total Sales:</strong><br/>
                <span className="text-success fw-bold">₦{farmerProfile.totalSales.toLocaleString()}</span>
              </Col>
              <Col sm={6} className="mb-3">
                <strong>Products Grown:</strong><br/>
                <div>
                  {farmerProfile.productsGrown.map((product, idx) => (
                    <Badge key={idx} bg="success" className="me-1 mb-1">
                      {product}
                    </Badge>
                  ))}
                </div>
              </Col>
              <Col sm={6} className="mb-3">
                <strong>Certifications:</strong><br/>
                <div>
                  {farmerProfile.certifications.map((cert, idx) => (
                    <Badge key={idx} bg="warning" text="dark" className="me-1 mb-1">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  const renderAdminProfile = () => (
    <Row>
      <Col md={4}>
        <Card className="text-center mb-4">
          <Card.Body>
            <div className="mb-3">
              <span style={{ fontSize: '4rem' }}>👨‍💻</span>
            </div>
            <h4>{adminProfile.name}</h4>
            <p className="text-muted">{adminProfile.role}</p>
            <Badge bg="danger" className="mb-2">System Administrator</Badge>
            <div className="d-grid">
              <Button variant="outline-danger" onClick={handleEditProfile}>
                Edit Profile
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
      
      <Col md={8}>
        <Card className="mb-4">
          <Card.Header className="bg-danger text-white">
            <h5 className="mb-0">Administrator Information</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col sm={6} className="mb-3">
                <strong>Email:</strong><br/>
                <span className="text-muted">{adminProfile.email}</span>
              </Col>
              <Col sm={6} className="mb-3">
                <strong>Phone:</strong><br/>
                <span className="text-muted">{adminProfile.phone}</span>
              </Col>
              <Col sm={6} className="mb-3">
                <strong>Last Login:</strong><br/>
                <span className="text-muted">{adminProfile.lastLogin}</span>
              </Col>
              <Col sm={6} className="mb-3">
                <strong>Member Since:</strong><br/>
                <span className="text-muted">{adminProfile.joinDate}</span>
              </Col>
              <Col sm={12} className="mb-3">
                <strong>Permissions:</strong><br/>
                <div>
                  {adminProfile.permissions.map((permission, idx) => (
                    <Badge key={idx} bg="danger" className="me-1 mb-1">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  return (
    <div>
      {updateAlert && (
        <Alert variant="success" className="mb-4">
          {updateAlert}
        </Alert>
      )}

      <div className="mb-4">
        <h2 className="text-success mb-3">👥 User Profiles</h2>
        
        {/* Profile Type Selector */}
        <div className="btn-group mb-4" role="group">
          <button
            type="button"
            className={`btn ${activeProfile === 'customer' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setActiveProfile('customer')}
          >
            👩‍💼 Customer
          </button>
          <button
            type="button"
            className={`btn ${activeProfile === 'farmer' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setActiveProfile('farmer')}
          >
            👨‍🌾 Farmer
          </button>
          <button
            type="button"
            className={`btn ${activeProfile === 'admin' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => setActiveProfile('admin')}
          >
            👨‍💻 Admin
          </button>
        </div>
      </div>

      {/* Profile Content */}
      {activeProfile === 'customer' && renderCustomerProfile()}
      {activeProfile === 'farmer' && renderFarmerProfile()}
      {activeProfile === 'admin' && renderAdminProfile()}

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit {activeProfile.charAt(0).toUpperCase() + activeProfile.slice(1)} Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingUser && (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" defaultValue={editingUser.name} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" defaultValue={editingUser.email} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" defaultValue={editingUser.phone} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      {activeProfile === 'customer' ? 'Address' : activeProfile === 'farmer' ? 'Farm Location' : 'Role'}
                    </Form.Label>
                    <Form.Control 
                      type="text" 
                      defaultValue={editingUser.address || editingUser.role} 
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserProfiles;

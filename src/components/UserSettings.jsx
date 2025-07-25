import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert, Image } from 'react-bootstrap';

const UserSettings = ({ user, onUpdateUser, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: user.name || user.firstName || '',
    email: user.email || '',
    phone: user.phone || '',
    address: {
      street: user.address?.street || '',
      city: user.address?.city || '',
      state: user.address?.state || '',
      country: user.address?.country || 'Nigeria'
    }
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setAlert({
          show: true,
          message: 'Image size should be less than 5MB',
          variant: 'danger'
        });
        return;
      }
      
      setProfileImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...user,
        ...formData,
        profileImage: previewImage || user.profileImage
      };
      
      onUpdateUser(updatedUser);
      setAlert({
        show: true,
        message: 'Profile updated successfully!',
        variant: 'success'
      });
      
      setTimeout(() => {
        setAlert({ show: false, message: '', variant: 'success' });
      }, 3000);
      
    } catch (error) {
      setAlert({
        show: true,
        message: 'Failed to update profile. Please try again.',
        variant: 'danger'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid px-0 min-vh-100 bg-light">
      {/* Header */}
      <div className="bg-success text-white py-4 mb-4">
        <div className="container">
          <div className="d-flex align-items-center">
            <button 
              className="btn btn-outline-light me-3"
              onClick={() => onNavigate('dashboard')}
            >
              <i className="fas fa-arrow-left me-2"></i>Back to Dashboard
            </button>
            <div>
              <h2 className="mb-0">
                <i className="fas fa-cog me-2"></i>Account Settings
              </h2>
              <p className="mb-0 opacity-75">Manage your profile information and preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <Row>
          <Col lg={8} className="mx-auto">
            {alert.show && (
              <Alert variant={alert.variant} dismissible onClose={() => setAlert({ show: false })}>
                {alert.message}
              </Alert>
            )}

            <Card className="shadow-sm border-0">
              <Card.Header className="bg-white border-bottom-0 py-4">
                <h4 className="mb-0 text-success">
                  <i className="fas fa-user-edit me-2"></i>Profile Information
                </h4>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  {/* Profile Picture Section */}
                  <div className="text-center mb-4">
                    <div className="position-relative d-inline-block">
                      <Image
                        src={previewImage || user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=28a745&color=fff&size=120`}
                        alt="Profile"
                        width={120}
                        height={120}
                        className="rounded-circle border border-3 border-success"
                        style={{ objectFit: 'cover' }}
                      />
                      <label 
                        htmlFor="profileImageInput"
                        className="position-absolute bottom-0 end-0 btn btn-success btn-sm rounded-circle p-2"
                        style={{ cursor: 'pointer' }}
                      >
                        <i className="fas fa-camera"></i>
                      </label>
                      <input
                        type="file"
                        id="profileImageInput"
                        className="d-none"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                    <div className="mt-2">
                      <small className="text-muted">Click the camera icon to upload a new photo</small>
                    </div>
                  </div>

                  <Row>
                    {/* Personal Information */}
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <i className="fas fa-user me-2 text-success"></i>Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="border-2"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <i className="fas fa-envelope me-2 text-success"></i>Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="border-2"
                          disabled
                        />
                        <Form.Text className="text-muted">
                          Email cannot be changed for security reasons
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <i className="fas fa-phone me-2 text-success"></i>Phone Number
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className="border-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Address Information */}
                  <h5 className="text-success mt-4 mb-3">
                    <i className="fas fa-map-marker-alt me-2"></i>Address Information
                  </h5>
                  
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Street Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleInputChange}
                          placeholder="Enter your street address"
                          className="border-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">City</Form.Label>
                        <Form.Control
                          type="text"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleInputChange}
                          placeholder="Enter city"
                          className="border-2"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">State</Form.Label>
                        <Form.Control
                          type="text"
                          name="address.state"
                          value={formData.address.state}
                          onChange={handleInputChange}
                          placeholder="Enter state"
                          className="border-2"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Country</Form.Label>
                        <Form.Select
                          name="address.country"
                          value={formData.address.country}
                          onChange={handleInputChange}
                          className="border-2"
                        >
                          <option value="Nigeria">Nigeria</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Kenya">Kenya</option>
                          <option value="South Africa">South Africa</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  {/* Action Buttons */}
                  <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => onNavigate('dashboard')}
                      disabled={loading}
                    >
                      <i className="fas fa-times me-2"></i>Cancel
                    </Button>
                    
                    <Button 
                      type="submit" 
                      variant="success" 
                      disabled={loading}
                      className="px-4"
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {/* Security Section */}
            <Card className="shadow-sm border-0 mt-4">
              <Card.Header className="bg-white border-bottom-0 py-4">
                <h4 className="mb-0 text-success">
                  <i className="fas fa-shield-alt me-2"></i>Security Settings
                </h4>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                  <div>
                    <h6 className="mb-1">Change Password</h6>
                    <small className="text-muted">Update your account password</small>
                  </div>
                  <Button variant="outline-success" size="sm">
                    <i className="fas fa-key me-2"></i>Change Password
                  </Button>
                </div>
                
                <div className="d-flex justify-content-between align-items-center py-3">
                  <div>
                    <h6 className="mb-1">Two-Factor Authentication</h6>
                    <small className="text-muted">Add an extra layer of security</small>
                  </div>
                  <Button variant="outline-success" size="sm">
                    <i className="fas fa-mobile-alt me-2"></i>Enable 2FA
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserSettings;

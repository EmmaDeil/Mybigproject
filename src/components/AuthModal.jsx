import React, { useState } from 'react';
import { Modal, Form, Button, Alert, Tabs, Tab } from 'react-bootstrap';
import { authAPI, apiUtils } from '../services/api';

const AuthModal = ({ show, onHide, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'danger' });
  const [loading, setLoading] = useState(false);

  const showAlert = (message, variant = 'danger') => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: 'danger' }), 5000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await authAPI.login(loginData);
      const user = apiUtils.handleAuthResponse(response);
      
      showAlert('Login successful! Welcome back.', 'success');
      setTimeout(() => {
        onLoginSuccess(user);
        onHide();
      }, 1000);
    } catch (error) {
      showAlert(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (signupData.password !== signupData.confirmPassword) {
      showAlert('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (signupData.password.length < 6) {
      showAlert('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: `${signupData.firstName} ${signupData.lastName}`,
        email: signupData.email,
        password: signupData.password,
        phone: signupData.phone,
        address: {
          street: signupData.address,
          city: 'Lagos', // Default for now
          state: 'Lagos State',
          country: 'Nigeria'
        }
      };

      const response = await authAPI.register(userData);
      const user = apiUtils.handleAuthResponse(response);
      
      showAlert('Account created successfully! Welcome to AgriTech.', 'success');
      setTimeout(() => {
        onLoginSuccess(user);
        onHide();
      }, 1000);
    } catch (error) {
      showAlert(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupInputChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="me-2">🌾</span>
          Welcome to AgriTech Farm Store
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alert.show && (
          <Alert variant={alert.variant} className="mb-3">
            {alert.message}
          </Alert>
        )}

        <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-3">
          <Tab eventKey="login" title="Login">
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginInputChange}
                  placeholder="Enter your password"
                  required
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="success" type="submit" size="lg" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </div>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Don't have an account?{' '}
                  <Button variant="link" size="sm" onClick={() => setActiveTab('signup')} className="p-0">
                    Sign up here
                  </Button>
                </small>
              </div>
            </Form>
          </Tab>

          <Tab eventKey="signup" title="Sign Up">
            <Form onSubmit={handleSignup}>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={signupData.firstName}
                      onChange={handleSignupInputChange}
                      placeholder="First name"
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={signupData.lastName}
                      onChange={handleSignupInputChange}
                      placeholder="Last name"
                      required
                    />
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupInputChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={signupData.phone}
                  onChange={handleSignupInputChange}
                  placeholder="+234 800 000 0000"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="address"
                  value={signupData.address}
                  onChange={handleSignupInputChange}
                  placeholder="Your delivery address"
                  required
                />
              </Form.Group>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupInputChange}
                      placeholder="Create password"
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={signupData.confirmPassword}
                      onChange={handleSignupInputChange}
                      placeholder="Confirm password"
                      required
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="d-grid">
                <Button variant="success" type="submit" size="lg" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Already have an account?{' '}
                  <Button variant="link" size="sm" onClick={() => setActiveTab('login')} className="p-0">
                    Login here
                  </Button>
                </small>
              </div>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;

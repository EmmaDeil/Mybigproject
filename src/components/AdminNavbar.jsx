import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Badge, Button } from 'react-bootstrap';

const AdminNavbar = ({ user, onLogout, stats = {} }) => {
  const [notifications] = useState([
    { id: 1, type: 'order', message: 'New order received', time: '5 min ago' },
    { id: 2, type: 'farmer', message: 'Farmer registration pending', time: '1 hour ago' }
  ]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm" style={{ minHeight: '70px' }}>
      <Container fluid>
        {/* Admin Brand */}
        <Navbar.Brand href="#" className="fw-bold">
          <span style={{ fontSize: '1.5rem' }}>🛠️</span>
          <span className="ms-2 text-success">AgriTech Admin</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="admin-navbar-nav" />
        <Navbar.Collapse id="admin-navbar-nav">
          {/* Admin Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link href="#dashboard" className="fw-medium">
              📊 Dashboard
            </Nav.Link>
            
            {/* Return to Main Site Button */}
            <Nav.Link 
              href="#" 
              className="fw-medium text-warning"
              onClick={() => window.location.reload()}
            >
              🏠 Main Site
            </Nav.Link>
            
            <NavDropdown title="📦 Orders" id="orders-dropdown">
              <NavDropdown.Item href="#all-orders">
                📋 All Orders 
                {stats.totalOrders > 0 && (
                  <Badge bg="primary" className="ms-2">{stats.totalOrders}</Badge>
                )}
              </NavDropdown.Item>
              <NavDropdown.Item href="#pending-orders">
                ⏳ Pending Orders
                {stats.pendingOrders > 0 && (
                  <Badge bg="warning" className="ms-2">{stats.pendingOrders}</Badge>
                )}
              </NavDropdown.Item>
              <NavDropdown.Item href="#processing-orders">
                🔄 Processing Orders
                {stats.processingOrders > 0 && (
                  <Badge bg="info" className="ms-2">{stats.processingOrders}</Badge>
                )}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#order-analytics">
                📈 Order Analytics
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="👨‍🌾 Farmers" id="farmers-dropdown">
              <NavDropdown.Item href="#all-farmers">
                👥 All Farmers
                {stats.totalFarmers > 0 && (
                  <Badge bg="success" className="ms-2">{stats.totalFarmers}</Badge>
                )}
              </NavDropdown.Item>
              <NavDropdown.Item href="#farmer-verification">
                ✅ Verification Requests
                {stats.pendingVerifications > 0 && (
                  <Badge bg="warning" className="ms-2">{stats.pendingVerifications}</Badge>
                )}
              </NavDropdown.Item>
              <NavDropdown.Item href="#farmer-products">
                🌱 Farmer Products
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#farmer-analytics">
                📊 Farmer Analytics
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="🌱 Products" id="products-dropdown">
              <NavDropdown.Item href="#all-products">
                📦 All Products
                {stats.totalProducts > 0 && (
                  <Badge bg="success" className="ms-2">{stats.totalProducts}</Badge>
                )}
              </NavDropdown.Item>
              <NavDropdown.Item href="#add-product">
                ➕ Add New Product
              </NavDropdown.Item>
              <NavDropdown.Item href="#product-categories">
                🏷️ Manage Categories
              </NavDropdown.Item>
              <NavDropdown.Item href="#inventory-management">
                📊 Inventory Management
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="👥 Users" id="users-dropdown">
              <NavDropdown.Item href="#all-users">
                👤 All Users
                {stats.totalUsers > 0 && (
                  <Badge bg="primary" className="ms-2">{stats.totalUsers}</Badge>
                )}
              </NavDropdown.Item>
              <NavDropdown.Item href="#user-roles">
                🎭 User Roles
              </NavDropdown.Item>
              <NavDropdown.Item href="#user-analytics">
                📈 User Analytics
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#reports" className="fw-medium">
              📈 Reports
            </Nav.Link>
          </Nav>

          {/* Right Side - Admin Tools & Profile */}
          <Nav className="align-items-center">
            {/* Notifications */}
            <NavDropdown
              title={
                <span className="position-relative">
                  🔔
                  {notifications.length > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      className="position-absolute top-0 start-100 translate-middle"
                      style={{ fontSize: '0.6rem' }}
                    >
                      {notifications.length}
                    </Badge>
                  )}
                </span>
              }
              id="notifications-dropdown"
              align="end"
            >
              <NavDropdown.Header>Recent Notifications</NavDropdown.Header>
              {notifications.map(notification => (
                <NavDropdown.Item key={notification.id} className="small">
                  <div className="d-flex justify-content-between">
                    <span>{notification.message}</span>
                    <small className="text-muted">{notification.time}</small>
                  </div>
                </NavDropdown.Item>
              ))}
              <NavDropdown.Divider />
              <NavDropdown.Item href="#all-notifications" className="text-center">
                View All Notifications
              </NavDropdown.Item>
            </NavDropdown>

            {/* SMS Configuration */}
            <Button variant="outline-light" size="sm" className="me-2">
              📱 SMS Config
            </Button>

            {/* System Settings */}
            <NavDropdown
              title="⚙️ Settings"
              id="settings-dropdown"
              align="end"
            >
              <NavDropdown.Item href="#system-settings">
                🔧 System Settings
              </NavDropdown.Item>
              <NavDropdown.Item href="#sms-configuration">
                📱 SMS Configuration
              </NavDropdown.Item>
              <NavDropdown.Item href="#payment-settings">
                💳 Payment Settings
              </NavDropdown.Item>
              <NavDropdown.Item href="#backup-restore">
                💾 Backup & Restore
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#system-logs">
                📋 System Logs
              </NavDropdown.Item>
            </NavDropdown>

            {/* Admin Profile */}
            <NavDropdown
              title={
                <span className="d-flex align-items-center">
                  <span className="me-2">👑</span>
                  <span className="d-none d-md-inline">
                    {user?.name || 'Admin'}
                  </span>
                </span>
              }
              id="admin-profile-dropdown"
              align="end"
            >
              <NavDropdown.Header>
                <div className="text-center">
                  <div style={{ fontSize: '2rem' }}>👑</div>
                  <strong>{user?.name || 'Admin User'}</strong>
                  <br />
                  <small className="text-muted">{user?.email}</small>
                  <br />
                  <Badge bg="success" className="mt-1">Administrator</Badge>
                </div>
              </NavDropdown.Header>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#admin-profile">
                👤 Admin Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#change-password">
                🔐 Change Password
              </NavDropdown.Item>
              <NavDropdown.Item href="#admin-preferences">
                ⚙️ Preferences
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item 
                onClick={handleLogout}
                className="text-danger"
              >
                🚪 Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;

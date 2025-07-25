import React from 'react';
import { Dropdown, Badge } from 'react-bootstrap';

const NavigationHeader = ({ currentPage, setCurrentPage, getTotalItems, getTotalPrice, user, onShowAuth, onLogout }) => {
  // Check if user is admin
  const isAdmin = () => {
    return user && (user.email === 'admin@agritech.com' || user.role === 'admin');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm mb-4">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          <span className="me-2">🌾</span>
          AgriTech Farm Store
        </a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-white ${currentPage === 'landing' ? 'active fw-bold' : ''}`}
                onClick={() => setCurrentPage('landing')}
              >
                <i className="fas fa-home me-1"></i>Home
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-white ${currentPage === 'home' ? 'active fw-bold' : ''}`}
                onClick={() => setCurrentPage('home')}
              >
                <i className="fas fa-leaf me-1"></i>Products
              </button>
            </li>
            
            {/* Show Dashboard for logged-in users (but not admins) */}
            {user && !isAdmin() && (
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link text-white ${currentPage === 'dashboard' ? 'active fw-bold' : ''}`}
                  onClick={() => setCurrentPage('dashboard')}
                >
                  <i className="fas fa-tachometer-alt me-1"></i>Dashboard
                </button>
              </li>
            )}
            
            {/* Show Orders and Cart only when logged in */}
            {user && (
              <>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link text-white ${currentPage === 'orders' ? 'active fw-bold' : ''}`}
                    onClick={() => setCurrentPage('orders')}
                  >
                    <i className="fas fa-box me-1"></i>My Orders
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link text-white ${currentPage === 'cart' ? 'active fw-bold' : ''}`}
                    onClick={() => setCurrentPage('cart')}
                  >
                    <i className="fas fa-shopping-cart me-1"></i>
                    Cart ({getTotalItems()})
                  </button>
                </li>
                
                {/* Admin Dashboard - Only show for admin users */}
                {isAdmin() && (
                  <li className="nav-item">
                    <button 
                      className={`nav-link btn btn-link text-warning ${currentPage === 'admin' ? 'active fw-bold' : ''}`}
                      onClick={() => setCurrentPage('admin')}
                    >
                      <i className="fas fa-tachometer-alt me-1"></i>Admin
                    </button>
                  </li>
                )}
              </>
            )}
            
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-white ${currentPage === 'about' ? 'active fw-bold' : ''}`}
                onClick={() => setCurrentPage('about')}
              >
                <i className="fas fa-info-circle me-1"></i>About
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link btn btn-link text-white ${currentPage === 'contact' ? 'active fw-bold' : ''}`}
                onClick={() => setCurrentPage('contact')}
              >
                <i className="fas fa-phone me-1"></i>Contact
              </button>
            </li>
          </ul>
          
          <div className="d-flex align-items-center">
            {user ? (
              <>
                {/* Cart Summary for logged in users */}
                <div className="me-3 d-none d-md-block">
                  <small className="text-white-50">Cart Total: </small>
                  <span className="text-warning fw-bold">₦{getTotalPrice().toLocaleString()}</span>
                </div>
                
                {/* User Dropdown */}
                <Dropdown align="end">
                  <Dropdown.Toggle 
                    variant="outline-light" 
                    id="dropdown-user" 
                    className="d-flex align-items-center border-0 bg-white bg-opacity-25"
                  >
                    <i className="fas fa-user-circle me-2"></i>
                    <span className="d-none d-md-inline">{user.firstName}</span>
                    <span className="d-md-none">👤</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="shadow">
                    <Dropdown.Header>
                      <div className="fw-bold">{user.firstName} {user.lastName}</div>
                      <small className="text-muted">{user.email}</small>
                      {isAdmin() && <Badge bg="warning" className="mt-1">Admin</Badge>}
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    
                    <Dropdown.Item onClick={() => setCurrentPage('orders')}>
                      <i className="fas fa-box me-2"></i>My Orders
                    </Dropdown.Item>
                    
                    <Dropdown.Item onClick={() => setCurrentPage('cart')}>
                      <i className="fas fa-shopping-cart me-2"></i>
                      Cart ({getTotalItems()} items)
                    </Dropdown.Item>
                    
                    {isAdmin() && (
                      <>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => setCurrentPage('admin')} className="text-warning">
                          <i className="fas fa-tachometer-alt me-2"></i>Admin Dashboard
                        </Dropdown.Item>
                      </>
                    )}
                    
                    <Dropdown.Divider />
                    
                    <Dropdown.Item onClick={onLogout} className="text-danger">
                      <i className="fas fa-sign-out-alt me-2"></i>Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                {/* Guest user welcome message */}
                <div className="me-3 d-none d-lg-block">
                  <small className="text-white-50">Welcome! Please login to start shopping</small>
                </div>
                
                {/* Login/Signup button for guests */}
                <button 
                  className="btn btn-warning fw-bold"
                  onClick={onShowAuth}
                >
                  <i className="fas fa-user me-1"></i>
                  <span className="d-none d-sm-inline">Get Started</span>
                  <span className="d-sm-none">Login</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationHeader;

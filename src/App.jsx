import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Import components
import LandingPage from './components/LandingPage';
import FarmProducts from './components/FarmProducts';
import ShoppingCart from './components/ShoppingCart';
import OrderManagement from './components/OrderManagement';
import OrdersPage from './components/OrdersPage';
import AboutPage from './components/AboutPage';
import NavigationHeader from './components/NavigationHeader';
import ContactPage from './components/ContactPage';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import UserOrdersPage from './components/UserOrdersPage';
import { apiUtils } from './services/api';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState('landing'); // Start with landing page
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  // Check for existing user session on app load
  React.useEffect(() => {
    const currentUser = apiUtils.getCurrentUser();
    const token = localStorage.getItem('agritech_token');
    
    if (currentUser && token) {
      setUser(currentUser);
    } else {
      // Clear any inconsistent state
      apiUtils.clearAuth();
    }
  }, []);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || item.orderQuantity || 1), 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const quantity = item.quantity || item.orderQuantity || 1;
      const price = item.price || 0;
      return total + (price * quantity);
    }, 0);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowAuth(false);
    
    // Redirect based on user role
    if (userData.role === 'admin' || userData.email === 'admin@agritech.com' || userData.email === 'eclefzy@gmail.com') {
      setCurrentPage('admin');
    } else {
      setCurrentPage('dashboard'); // Regular users go to user dashboard
    }
  };

  const handleLogout = () => {
    apiUtils.clearAuth();
    setUser(null);
    setCartItems([]);
    setCurrentPage('landing'); // Redirect to landing page after logout
  };

  const handleShowAuth = () => {
    setShowAuth(true);
  };

  // Check if user is admin (you can modify this logic as needed)
  const isAdmin = () => {
    return user && (user.email === 'admin@agritech.com' || user.role === 'admin');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
        
      case 'dashboard':
        // User Dashboard - only for logged-in non-admin users
        if (!user) {
          return (
            <div className="container-fluid px-0 min-vh-100">
              <div className="row g-0 min-vh-100">
                <div className="col-12 px-4 py-5 bg-light d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <div style={{ fontSize: '5rem' }} className="mb-4">🔒</div>
                    <h3 className="text-muted mb-3">Login Required</h3>
                    <p className="text-muted mb-4">Please login to access your dashboard</p>
                    <button 
                      className="btn btn-success btn-lg"
                      onClick={handleShowAuth}
                    >
                      <i className="fas fa-user me-2"></i>
                      Login / Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        
        if (isAdmin()) {
          // If admin tries to access user dashboard, redirect to admin dashboard
          setCurrentPage('admin');
          return null;
        }
        
        return <UserDashboard 
          user={user} 
          onLogout={handleLogout}
          cartItems={cartItems}
          getTotalItems={getTotalItems}
          getTotalPrice={getTotalPrice}
          setCurrentPage={setCurrentPage}
          onShowAuth={handleShowAuth}
        />;
        
      case 'home':
        return (
          <div className="container-fluid px-0">
            {/* Farm Products Section */}
            <div className="row g-0 mb-5">
              <div className="col-12 px-4">
                <FarmProducts 
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  addToCart={addToCart}
                  user={user}
                  onShowAuth={handleShowAuth}
                />
              </div>
            </div>
          </div>
        );

      case 'cart':
        if (!user) {
          return (
            <div className="container-fluid px-0 min-vh-100">
              <div className="row g-0 min-vh-100">
                <div className="col-12 px-4 py-5 bg-light d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <div style={{ fontSize: '5rem' }} className="mb-4">🔒</div>
                    <h3 className="text-muted mb-3">Login Required</h3>
                    <p className="text-muted mb-4">Please login to view your cart and place orders</p>
                    <button 
                      className="btn btn-success btn-lg"
                      onClick={handleShowAuth}
                    >
                      <i className="fas fa-user me-2"></i>
                      Login / Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        
        return (
          <div className="container-fluid px-0 min-vh-100">
            <div className="row g-0 min-vh-100">
              <div className="col-12 px-4 py-5 bg-light">
                <div className="text-center mb-5">
                  <h1 className="display-4 text-success mb-3">🛍️ Your Shopping Cart</h1>
                  <p className="lead text-muted">Review and manage your selected items</p>
                </div>
                {cartItems.length > 0 ? (
                  <div className="row justify-content-center">
                    <div className="col-lg-10">
                      <ShoppingCart 
                        cartItems={cartItems}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                        setCartItems={setCartItems}
                        user={user}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <div style={{ fontSize: '5rem' }} className="mb-4">🛒</div>
                    <h3 className="text-muted mb-3">Your cart is empty</h3>
                    <p className="text-muted mb-4">Add some fresh products from our farm store!</p>
                    <button 
                      className="btn btn-success btn-lg"
                      onClick={() => setCurrentPage('home')}
                    >
                      <i className="fas fa-leaf me-2"></i>
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'orders':
        if (!user) {
          return (
            <div className="container-fluid px-0 min-vh-100">
              <div className="row g-0 min-vh-100">
                <div className="col-12 px-4 py-5 bg-light d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <div style={{ fontSize: '5rem' }} className="mb-4">🔒</div>
                    <h3 className="text-muted mb-3">Login Required</h3>
                    <p className="text-muted mb-4">Please login to view your order history</p>
                    <button 
                      className="btn btn-success btn-lg"
                      onClick={handleShowAuth}
                    >
                      <i className="fas fa-user me-2"></i>
                      Login / Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        
        return <UserOrdersPage user={user} onNavigate={setCurrentPage} />;

      case 'about':
        return <AboutPage />;

      case 'contact':
        return <ContactPage />;

      case 'admin':
        if (!isAdmin()) {
          return (
            <div className="container-fluid px-0 min-vh-100">
              <div className="row g-0 min-vh-100">
                <div className="col-12 px-4 py-5 bg-light d-flex align-items-center justify-content-center">
                  <div className="text-center">
                    <div style={{ fontSize: '5rem' }} className="mb-4">🚫</div>
                    <h3 className="text-muted mb-3">Access Denied</h3>
                    <p className="text-muted mb-4">You don't have admin privileges to access this page</p>
                    <button 
                      className="btn btn-success btn-lg"
                      onClick={() => setCurrentPage('home')}
                    >
                      <i className="fas fa-home me-2"></i>
                      Go Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        
        return <AdminDashboard 
          user={user} 
          onLogout={() => {
            apiUtils.clearAuth();
            setUser(null);
            setCartItems([]);
            setCurrentPage('landing');
          }} 
        />;

      default:
        return null;
    }
  };

  return (
    <div className="App">
      {/* Navigation Header - Show based on user type and current page */}
      {!(user && isAdmin() && currentPage === 'admin') && 
       !(user && !isAdmin() && currentPage === 'dashboard') && (
        <NavigationHeader 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          getTotalItems={getTotalItems}
          getTotalPrice={getTotalPrice}
          user={user}
          onShowAuth={handleShowAuth}
          onLogout={handleLogout}
        />
      )}

      <div className="container-fluid px-0">
        {renderPage()}
      </div>

      <AuthModal 
        show={showAuth}
        onHide={() => setShowAuth(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;

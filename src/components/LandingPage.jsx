import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

function LandingPage({ onNavigate }) {
  const features = [
    {
      icon: '🌾',
      title: 'Farm to Table',
      description: 'Direct connection between farmers and customers for the freshest produce'
    },
    {
      icon: '💰',
      title: 'Fair Pricing',
      description: 'Transparent pricing in Naira with no hidden fees or middleman markups'
    },
    {
      icon: '📱',
      title: 'Mobile First',
      description: 'Designed for smartphones to reach rural farmers and urban customers'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery from farm to your doorstep across Nigeria'
    },
    {
      icon: '✅',
      title: 'Quality Assured',
      description: 'All farmers are verified and products are quality checked before delivery'
    },
    {
      icon: '🤝',
      title: 'Community Driven',
      description: 'Supporting local farmers and building stronger agricultural communities'
    }
  ];

  const stats = [
    { number: '500+', label: 'Registered Farmers', icon: '👨‍🌾' },
    { number: '10K+', label: 'Happy Customers', icon: '😊' },
    { number: '50K+', label: 'Orders Delivered', icon: '📦' },
    { number: '36+', label: 'States Covered', icon: '🗺️' }
  ];

  const testimonials = [
    {
      name: 'Mrs. Adunni Olatunji',
      location: 'Lagos',
      role: 'Customer',
      text: 'I love getting fresh tomatoes and vegetables directly from the farm. The quality is amazing and prices are fair!',
      avatar: '👩‍💼'
    },
    {
      name: 'Alhaji Musa Ibrahim',
      location: 'Kano',
      role: 'Farmer',
      text: 'This platform has transformed my farming business. I can now sell directly to customers and earn better profits.',
      avatar: '👨‍🌾'
    },
    {
      name: 'Dr. Chioma Okwu',
      location: 'Abuja',
      role: 'Customer',
      text: 'As a busy professional, I appreciate the convenience of ordering fresh farm produce online. Delivery is always on time.',
      avatar: '👩‍⚕️'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-success text-white py-5 mb-5">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={6}>
              <h1 className="display-3 fw-bold mb-4">
                🌱 Fresh Farm Produce
                <br />
                <span className="text-warning">Direct to You</span>
              </h1>
              <p className="lead mb-4">
                Connect directly with Nigerian farmers and get the freshest produce delivered to your doorstep. 
                Supporting local agriculture while ensuring quality and fair prices for everyone.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-4">
                <Button 
                  size="lg" 
                  variant="warning" 
                  className="px-4 py-2"
                  onClick={() => onNavigate && onNavigate('home')}
                >
                  🛒 Shop Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline-light" 
                  className="px-4 py-2"
                  onClick={() => onNavigate && onNavigate('about')}
                >
                  👨‍🌾 Learn More
                </Button>
              </div>
              <div className="d-flex align-items-center gap-4 text-light">
                <div>
                  <Badge bg="warning" text="dark" className="mb-1">FREE DELIVERY</Badge>
                  <div className="small">Orders above ₦5,000</div>
                </div>
                <div>
                  <Badge bg="warning" text="dark" className="mb-1">VERIFIED FARMERS</Badge>
                  <div className="small">Quality guaranteed</div>
                </div>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="position-relative">
                <div className="bg-white bg-opacity-25 rounded-circle p-5 d-inline-block">
                  <span style={{ fontSize: '8rem' }}>🥕</span>
                </div>
                <div className="position-absolute top-0 start-0">
                  <span style={{ fontSize: '3rem' }}>🍅</span>
                </div>
                <div className="position-absolute top-0 end-0">
                  <span style={{ fontSize: '3rem' }}>🌽</span>
                </div>
                <div className="position-absolute bottom-0 start-0">
                  <span style={{ fontSize: '3rem' }}>🥬</span>
                </div>
                <div className="position-absolute bottom-0 end-0">
                  <span style={{ fontSize: '3rem' }}>🍌</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 mb-5">
        <Container>
          <Row>
            {stats.map((stat, index) => (
              <Col md={3} key={index} className="text-center mb-4">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="py-4">
                    <div style={{ fontSize: '3rem' }} className="mb-2">{stat.icon}</div>
                    <div className="h2 text-success fw-bold mb-1">{stat.number}</div>
                    <div className="text-muted">{stat.label}</div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5 mb-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-success mb-3">Why Choose Our Platform?</h2>
            <p className="lead text-muted">
              We're revolutionizing agriculture in Nigeria by connecting farmers directly with customers
            </p>
          </div>
          <Row>
            {features.map((feature, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="text-center p-4">
                    <div style={{ fontSize: '3rem' }} className="mb-3">{feature.icon}</div>
                    <Card.Title className="h5 mb-3">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="py-5 mb-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-success mb-3">How It Works</h2>
            <p className="lead text-muted">Simple steps to get fresh farm produce</p>
          </div>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                1
              </div>
              <h5>Browse Products</h5>
              <p className="text-muted">Explore fresh produce from verified farmers across Nigeria</p>
            </Col>
            <Col md={3} className="mb-4">
              <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                2
              </div>
              <h5>Place Your Order</h5>
              <p className="text-muted">Select quantities and add items to your cart with transparent pricing</p>
            </Col>
            <Col md={3} className="mb-4">
              <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                3
              </div>
              <h5>Secure Payment</h5>
              <p className="text-muted">Pay safely using bank transfer, mobile money, or cash on delivery</p>
            </Col>
            <Col md={3} className="mb-4">
              <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                4
              </div>
              <h5>Fast Delivery</h5>
              <p className="text-muted">Receive fresh produce at your doorstep within 24-48 hours</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 mb-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-success mb-3">What Our Community Says</h2>
            <p className="lead text-muted">Real stories from farmers and customers</p>
          </div>
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col lg={4} key={index} className="mb-4">
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <span style={{ fontSize: '3rem' }} className="me-3">{testimonial.avatar}</span>
                      <div>
                        <h6 className="mb-1">{testimonial.name}</h6>
                        <small className="text-muted">{testimonial.role} • {testimonial.location}</small>
                      </div>
                    </div>
                    <p className="text-muted mb-0">"{testimonial.text}"</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-success text-white">
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h2 className="display-5 fw-bold mb-3">Ready to Transform Agriculture?</h2>
              <p className="lead mb-4">
                Join thousands of farmers and customers who are already part of our growing community
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Button 
                  size="lg" 
                  variant="warning" 
                  className="px-4 py-2"
                  onClick={() => onNavigate && onNavigate('marketplace')}
                >
                  🛒 Start Shopping
                </Button>
                <Button 
                  size="lg" 
                  variant="outline-light" 
                  className="px-4 py-2"
                  onClick={() => onNavigate && onNavigate('profiles')}
                >
                  👨‍🌾 Become a Farmer
                </Button>
                <Button 
                  size="lg" 
                  variant="outline-light" 
                  className="px-4 py-2"
                  onClick={() => onNavigate && onNavigate('learning')}
                >
                  📞 Contact Us
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default LandingPage;

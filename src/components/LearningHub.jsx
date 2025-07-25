import React from 'react';
import { Card, Row, Col, Badge, Button } from 'react-bootstrap';

function LearningHub() {
  const courses = [
    {
      title: 'Sustainable Farming Practices',
      duration: '2 hours',
      level: 'Beginner',
      participants: 1240,
      rating: '4.8',
      category: 'Sustainability'
    },
    {
      title: 'Climate-Smart Agriculture',
      duration: '3 hours',
      level: 'Intermediate',
      participants: 890,
      rating: '4.7',
      category: 'Climate'
    },
    {
      title: 'Digital Farm Management',
      duration: '1.5 hours',
      level: 'Beginner',
      participants: 2100,
      rating: '4.9',
      category: 'Technology'
    },
    {
      title: 'Market Analysis & Pricing',
      duration: '2.5 hours',
      level: 'Advanced',
      participants: 650,
      rating: '4.6',
      category: 'Business'
    }
  ];

  const tips = [
    {
      title: 'Crop Rotation Benefits',
      content: 'Rotating crops improves soil health and reduces pest problems naturally.',
      category: 'Soil Health'
    },
    {
      title: 'Water Conservation',
      content: 'Drip irrigation can reduce water usage by up to 50% while maintaining yields.',
      category: 'Water Management'
    },
    {
      title: 'Pest Management',
      content: 'Companion planting can naturally repel pests and attract beneficial insects.',
      category: 'Pest Control'
    }
  ];

  return (
    <Row>
      <Col lg={8}>
        <Card className="mb-4">
          <Card.Header className="bg-info text-white">
            <h5 className="mb-0">📚 Agricultural Learning Courses</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              {courses.map((course, index) => (
                <Col md={6} key={index} className="mb-3">
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Badge bg="secondary" className="mb-2">{course.category}</Badge>
                        <small className="text-muted">⭐ {course.rating}</small>
                      </div>
                      <Card.Title className="h6">{course.title}</Card.Title>
                      <div className="small text-muted mb-3 flex-grow-1">
                        <div>⏱️ {course.duration}</div>
                        <div>📈 {course.level}</div>
                        <div>👥 {course.participants} participants</div>
                      </div>
                      <Button variant="outline-info" size="sm">
                        Start Learning
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Col>
      
      <Col lg={4}>
        <Card>
          <Card.Header className="bg-warning text-dark">
            <h5 className="mb-0">💡 Daily Farming Tips</h5>
          </Card.Header>
          <Card.Body>
            {tips.map((tip, index) => (
              <div key={index} className="mb-3 p-3 bg-light rounded">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0 text-primary">{tip.title}</h6>
                  <Badge bg="light" text="dark" className="small">{tip.category}</Badge>
                </div>
                <p className="mb-0 small text-muted">{tip.content}</p>
              </div>
            ))}
            
            <div className="mt-4">
              <h6 className="text-muted mb-3">🔗 Quick Resources</h6>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" size="sm">
                  📞 Extension Officer Contact
                </Button>
                <Button variant="outline-success" size="sm">
                  🌾 Crop Calendar
                </Button>
                <Button variant="outline-info" size="sm">
                  📊 Yield Calculator
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default LearningHub;

import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';

function DashboardCards() {
  const cards = [
    {
      title: 'Farming Efficiency',
      icon: '🚜',
      description: 'Optimize your farming operations with smart tools and IoT sensors',
      status: 'Active',
      color: 'success'
    },
    {
      title: 'Market Access',
      icon: '📈',
      description: 'Connect directly with buyers and get real-time market prices',
      status: 'Available',
      color: 'primary'
    },
    {
      title: 'Sustainable Agriculture',
      icon: '🌿',
      description: 'Implement eco-friendly farming practices for better yields',
      status: 'Growing',
      color: 'success'
    },
    {
      title: 'Climate Resilience',
      icon: '🌡️',
      description: 'Weather forecasting and climate adaptation strategies',
      status: 'Monitoring',
      color: 'warning'
    },
    {
      title: 'Agri-Data Analytics',
      icon: '📊',
      description: 'Data-driven insights for informed farming decisions',
      status: 'Analyzing',
      color: 'info'
    },
    {
      title: 'Rural Connectivity',
      icon: '📡',
      description: 'Improve internet access and mobile connectivity in rural areas',
      status: 'Expanding',
      color: 'secondary'
    }
  ];

  return (
    <Row>
      {cards.map((card, index) => (
        <Col md={6} lg={4} key={index} className="mb-4">
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="d-flex flex-column">
              <div className="text-center mb-3">
                <span style={{ fontSize: '3rem' }}>{card.icon}</span>
              </div>
              <Card.Title className="text-center h5">{card.title}</Card.Title>
              <Card.Text className="text-muted flex-grow-1">
                {card.description}
              </Card.Text>
              <div className="text-center">
                <Badge bg={card.color}>{card.status}</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default DashboardCards;

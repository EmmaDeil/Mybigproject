import React, { useState } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';

function MarketConnect() {
  const [cropType, setCropType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const marketPrices = [
    { crop: 'Tomatoes', price: '₦2,500/kg', trend: '↗️ +5%', demand: 'High' },
    { crop: 'Maize', price: '₦800/kg', trend: '↘️ -2%', demand: 'Medium' },
    { crop: 'Rice', price: '₦1,200/kg', trend: '↗️ +8%', demand: 'High' },
    { crop: 'Yam', price: '₦1,800/kg', trend: '→ 0%', demand: 'Medium' }
  ];

  return (
    <Row>
      <Col lg={8}>
        <Card className="mb-4">
          <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">📈 Live Market Prices</h5>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Crop</th>
                    <th>Current Price</th>
                    <th>Trend</th>
                    <th>Demand</th>
                  </tr>
                </thead>
                <tbody>
                  {marketPrices.map((item, index) => (
                    <tr key={index}>
                      <td className="fw-medium">{item.crop}</td>
                      <td className="text-success fw-bold">{item.price}</td>
                      <td>{item.trend}</td>
                      <td>
                        <span className={`badge ${item.demand === 'High' ? 'bg-success' : 'bg-warning'}`}>
                          {item.demand}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-3 bg-light rounded">
              <h6 className="text-primary mb-2">💡 Market Insights</h6>
              <p className="mb-1 small">• Tomato prices are rising due to seasonal demand</p>
              <p className="mb-1 small">• Rice demand is high - good time to sell</p>
              <p className="mb-0 small">• Consider storing maize until prices recover</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4}>
        <Card>
          <Card.Header className="bg-success text-white">
            <h5 className="mb-0">🤝 Connect to Market</h5>
          </Card.Header>
          <Card.Body>
            {showAlert && (
              <Alert variant="success" className="py-2">
                Request submitted! Buyers will contact you soon.
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Crop Type</Form.Label>
                <Form.Select 
                  value={cropType} 
                  onChange={(e) => setCropType(e.target.value)}
                  required
                >
                  <option value="">Select crop...</option>
                  <option value="tomatoes">Tomatoes</option>
                  <option value="maize">Maize</option>
                  <option value="rice">Rice</option>
                  <option value="yam">Yam</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Quantity (kg)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </Form.Group>
              
              <Button variant="success" type="submit" className="w-100">
                Find Buyers
              </Button>
            </Form>
            
            <div className="mt-4">
              <h6 className="text-muted mb-2">Recent Connections</h6>
              <div className="small">
                <div className="d-flex justify-content-between py-1">
                  <span>Lagos Market</span>
                  <span className="text-success">Connected</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span>Kano Traders</span>
                  <span className="text-primary">Pending</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span>Export Co.</span>
                  <span className="text-success">Connected</span>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default MarketConnect;

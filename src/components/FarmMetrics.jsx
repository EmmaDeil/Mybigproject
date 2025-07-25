import React from 'react';
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';

function FarmMetrics() {
  const metrics = [
    { label: 'Crop Health', value: 85, variant: 'success' },
    { label: 'Soil Moisture', value: 72, variant: 'info' },
    { label: 'Weather Conditions', value: 90, variant: 'primary' },
    { label: 'Market Demand', value: 68, variant: 'warning' }
  ];

  return (
    <Card className="mb-4">
      <Card.Header className="bg-light">
        <h5 className="mb-0">📊 Farm Metrics Overview</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          {metrics.map((metric, index) => (
            <Col md={6} key={index} className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-medium">{metric.label}</span>
                <span className="text-muted">{metric.value}%</span>
              </div>
              <ProgressBar 
                variant={metric.variant} 
                now={metric.value} 
                style={{ height: '8px' }}
              />
            </Col>
          ))}
        </Row>
        <div className="mt-3 p-3 bg-light rounded">
          <h6 className="text-success mb-2">🎯 Today's Recommendations</h6>
          <ul className="mb-0 small">
            <li>Water crops in sections 2 and 4 - soil moisture below optimal</li>
            <li>Apply organic fertilizer to boost crop health in section 1</li>
            <li>Weather forecast shows rain in 2 days - plan harvest accordingly</li>
            <li>Tomato prices are 15% higher today - consider selling current stock</li>
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
}

export default FarmMetrics;

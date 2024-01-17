// src/components/PredictionResult.js
import React from 'react';
import { Container, Card } from 'react-bootstrap';

const PredictionResult = ({ prediction , confidence}) => {
  return (
    <Card data-bs-theme="dark" border="secondary" bg='#1a1e21' style={{ marginTop: '10px'}}>
      <Card.Body>
        <Container className="text-center" style={{marginBottom: '1px'}}>
          <h1 className="mx-auto">Prediction Result:</h1>
          {prediction === null ? (
            <></>
          ) : prediction === 1 ? (
            <h2 className="mx-auto text-danger">The person is diabetic</h2>
          ) : (
            <h2 className="mx-auto text-success">The person is not diabetic</h2>
          )}
          {confidence && <p>{confidence}</p>}
        </Container>
      </Card.Body>
      <Card.Footer className="text-center">Michael Selvesakis © 2023</Card.Footer>
    </Card>
  );
};

export default PredictionResult;

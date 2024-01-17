// app.js
import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import PredictionResult from './components/PredictionResult';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [errors, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleFormSubmit = async (formData) => {
    setShowAlert(false);
    try {
      const res = await axios.post('https://api.michaelselvesakis.com/predict', formData, { withCredentials: true });
      setPrediction(res.data.prediction);
      setConfidence(res.data.confidence);
      setError(null); // Clear previous errors
      console.log(res);
    } catch (error) {
      setError(error);
      setShowAlert(true);
    }
  };

  return (
    <Container style={{ maxHeight: 'fit-content' }} className="text-light">
      <Row>
        <Col>
          {showAlert && errors && (
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible style={{ paddingBottom: 'auto' }}>
              Error: {errors.message}
            </Alert>
          )}
        </Col>
      </Row>

      <Row>
        <Col style={{ paddingTop: '7px' }}>
          <InputForm onSubmit={handleFormSubmit} />
        </Col>
      </Row>

      <Row>
        <Col>
          <PredictionResult prediction={prediction} confidence={confidence} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;

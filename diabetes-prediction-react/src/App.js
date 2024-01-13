// app.js
import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import PredictionResult from './components/PredictionResult';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [prediction, setPrediction] = useState(null);

  const handleFormSubmit = async (formData) => {
    try {
      const res = await axios.post('http://michaelselvesakis.ddns.net:5000/predict', formData, { withCredentials: true });
      setPrediction(res.data.prediction);
      // setChartData(res.data.chartData);
      console.log(res);

      // Assuming the response contains both prediction and chart data

    } catch (error) {
      alert('Error making prediction: ' + error.message);
    }
  };

  return (
    <Container style={{ maxHeight: 'fit-content' }} className="text-light">
      <Row>
        <Col style={{ paddingTop: '25px' }}>
          <InputForm onSubmit={handleFormSubmit} />
        </Col>
      </Row>

      <Row>
        <Col>{<PredictionResult prediction={prediction} />}</Col>
      </Row>
    </Container>
  );
};

export default App;

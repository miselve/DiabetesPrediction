// Inputform.js
import React, { useState } from 'react';
import { Card, Form, FormGroup, Button, Alert } from 'react-bootstrap';

const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear the error message when the user starts typing in a field
    setFormErrors({
      ...formErrors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    const errors = {};

    // Add validation logic for each field
    if (!formData.Pregnancies) {
      errors.Pregnancies = 'Pregnancies is required';
    }
    if (!formData.Glucose) {
      errors.Glucose = 'Glucose is required';
    }
    if (!formData.BloodPressure) {
      errors.BloodPressure = 'Blood Pressure is required';
    }
    if (!formData.SkinThickness) {
      errors.SkinThickness = 'Skin Thickness is required';
    }
    if (!formData.Insulin) {
      errors.Insulin = 'Insulin is required';
    }
    if (!formData.BMI) {
      errors.BMI = 'BMI is required';
    }
    if (!formData.DiabetesPedigreeFunction) {
      errors.DiabetesPedigreeFunction = 'Diabetes Pedigree Function is required';
    }
    if (!formData.Age) {
      errors.Age = 'Age is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowAlert(false);
      onSubmit(formData);
    } else {
      // Form validation failed
      setShowAlert(true);
      console.log('Please fill in all required fields');
    }
  };

  return (
    <>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          Please fill in all required fields.
        </Alert>
      )}

      <Card data-bs-theme="dark" border="secondary" bg='#1a1e21'>
        <Card.Header as="h5" bg={'primary'}>Diabetes Prediction</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <FormGroup controlId="Pregnancies">
              <Form.Label>Pregnancies</Form.Label>
              <Form.Control
                type="number"
                name="Pregnancies"
                value={formData.Pregnancies || ''}
                onChange={handleChange}
              />
              {formErrors.Pregnancies && <small className="text-danger">{formErrors.Pregnancies}</small>}
            </FormGroup>

            <FormGroup controlId="Glucose">
              <Form.Label>Glucose</Form.Label>
              <Form.Control
                type="number"
                name="Glucose"
                value={formData.Glucose || ''}
                onChange={handleChange}
              />
              {formErrors.Glucose && <small className="text-danger">{formErrors.Glucose}</small>}
            </FormGroup>

            <FormGroup controlId="BloodPressure">
              <Form.Label>Blood Pressure</Form.Label>
              <Form.Control
                type="number"
                name="BloodPressure"
                value={formData.BloodPressure || ''}
                onChange={handleChange}
              />
              {formErrors.BloodPressure && <small className="text-danger">{formErrors.BloodPressure}</small>}
            </FormGroup>

            <FormGroup controlId="SkinThickness">
              <Form.Label>Skin Thickness</Form.Label>
              <Form.Control
                type="number"
                name="SkinThickness"
                value={formData.SkinThickness || ''}
                onChange={handleChange}
              />
              {formErrors.SkinThickness && <small className="text-danger">{formErrors.SkinThickness}</small>}
            </FormGroup>

            <FormGroup controlId="Insulin">
              <Form.Label>Insulin</Form.Label>
              <Form.Control
                type="number"
                name="Insulin"
                value={formData.Insulin || ''}
                onChange={handleChange}
              />
              {formErrors.Insulin && <small className="text-danger">{formErrors.Insulin}</small>}
            </FormGroup>

            <FormGroup controlId="BMI">
              <Form.Label>BMI (Body Mass Index)</Form.Label>
              <Form.Control
                type="number"
                name="BMI"
                value={formData.BMI || ''}
                onChange={handleChange}
              />
              {formErrors.BMI && <small className="text-danger">{formErrors.BMI}</small>}
            </FormGroup>

            <FormGroup controlId="DiabetesPedigreeFunction">
              <Form.Label>Diabetes Pedigree Function</Form.Label>
              <Form.Control
                type="number"
                name="DiabetesPedigreeFunction"
                value={formData.DiabetesPedigreeFunction || ''}
                onChange={handleChange}
              />
              {formErrors.DiabetesPedigreeFunction && (
                <small className="text-danger">{formErrors.DiabetesPedigreeFunction}</small>
              )}
            </FormGroup>

            <FormGroup controlId="Age">
              <Form.Label>Age (in years)</Form.Label>
              <Form.Control
                type="number"
                name="Age"
                value={formData.Age || ''}
                onChange={handleChange}
              />
              {formErrors.Age && <small className="text-danger">{formErrors.Age}</small>}
            </FormGroup>

            <Button type="submit" className="mx-auto d-block" style={{ marginTop: '10px' }}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>

    </>
  );
};

export default InputForm;

import React, { useState } from 'react';
import { Container, Card, Button, Modal, Spinner,Image } from 'react-bootstrap';
import AboutModal from './AboutModal';

const PredictionResult = ({ prediction, confidence, featureContributions, loading, shap_summary_plot }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Card data-bs-theme="dark" border="secondary" bg="#1a1e21" style={{ marginTop: '10px' }}>
      <Card.Body>
        <Container style={{ marginBottom: '1px' }}  className="mx-auto text-center">
          <h1 className="mx-auto text-center">Prediction Result:</h1>

          {loading ? (
            <div className="text-center" style={{ marginTop: '20px' }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              {prediction == null ? (
                <></>
              ) : prediction === 1 ? (
                <h2 className="mx-auto text-danger">The person is diabetic</h2>
              ) : (
                <h2 className="mx-auto text-success">The person is not diabetic</h2>
              )}

              {confidence && <p>{confidence}</p>}

              {featureContributions && (
                <>
                  <Button variant="link" onClick={handleShow}>
                    Show Feature Contributions
                  </Button>

                  <Modal show={showModal} onHide={handleClose} style={{ color: 'white' }} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton style={{ color: 'white', background: '#0d6efd' }} onClick={handleClose}>
                      <Modal.Title>Feature Contributions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-dark' data-bs-theme="dark">
                      <pre style={{ color: 'white' }}>
                        <Container className="text-center">
                          <h5 style={{ lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: featureContributions }} >
                          </h5>
                          <Image src={shap_summary_plot} alt="SHAP Summary Plot" fluid className='rounded' />
                        </Container>
                      </pre>
                    </Modal.Body>
                    <Modal.Footer className='bg-dark' data-bs-theme="dark">
                      <Button variant="danger" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              )}
            </>
          )}
        </Container>
      </Card.Body>
      <Card.Footer className="text-center">Michael Selvesakis © 2024 <br/>
        <AboutModal/>
      </Card.Footer>
    </Card>
  );
};

export default PredictionResult;

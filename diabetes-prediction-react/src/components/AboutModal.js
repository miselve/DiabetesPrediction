import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap-icons/font/bootstrap-icons.css';



function AboutModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="text-center" variant="link" onClick={handleShow}>
        About This Project
      </Button>

      <Modal show={show} onHide={handleClose} style={{ color: 'white' }} >
        <Modal.Header style={{ color: 'white', background: '#0d6efd' }}  closeButton>
          <Modal.Title >About This Project </Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-dark text-center' data-bs-theme="dark" >This project was created by Michael Selvesakis to demonstrate the deployment of a machine learning model as a WebApp in the realms of "Neural Networks" which was part of Democritus University of Thrace's curriculum. <br/>
        <hr></hr>
        <p class="fw-bold">
        Developer:
        Michael Selvesakis <a href="https://www.linkedin.com/in/michael-selvesakis-010b65242/" target="_blank" rel="noopener noreferrer" class="text-white ms-2"><i class="bi bi-linkedin text-white"></i></a><a href="mailto:michaelselvesakis@gmail.com" class="text-white ms-2"><i class="bi bi-envelope-at-fill text-white"></i></a><br />
        </p>
        </Modal.Body>
        <Modal.Footer className='bg-dark' data-bs-theme="dark">
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AboutModal;
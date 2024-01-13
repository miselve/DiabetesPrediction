import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
//document.body.classList.add('bg-dark'); // Add the Bootstrap dark theme class to the body
document.body.style.backgroundColor = '#1a1e21'; // Set the background color to the Bootstrap dark theme color


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

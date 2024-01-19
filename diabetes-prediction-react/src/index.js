import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
document.title = 'Diabetes Prediction - Michael Selvesakis';
//document.body.classList.add('bg-dark'); // Add the Bootstrap dark theme class to the body
document.body.style.backgroundColor = '#1a1e21'; // Set the background color to the Bootstrap dark theme color

const googleTagManagerScript = document.createElement('script');
googleTagManagerScript.async = true;
googleTagManagerScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-JYBL89HGWY';
document.head.appendChild(googleTagManagerScript);

googleTagManagerScript.onload = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-JYBL89HGWY');
};

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

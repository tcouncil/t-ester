import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes  } from "react-router";
import './index.css';
import App from './App';
import Forum from './Forum/Forum';
import reportWebVitals from './reportWebVitals';
import Signup from './Forum/Signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<App custom="true"/>} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-responsive-carousel';


import Router from './Component/Router';
// import GridExample from './Component/gridbs';
// import AutoLayoutSizingExample from './Component/layoutgrid';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Router/>
    // {/* <GridExample/>
    // <AutoLayoutSizingExample/> */}
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

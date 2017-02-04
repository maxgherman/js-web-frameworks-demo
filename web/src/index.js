import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './components/routing/Router';


document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(AppRouter),
    document.getElementById('mount-point')
  );
});
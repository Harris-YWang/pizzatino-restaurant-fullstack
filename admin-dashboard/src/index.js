import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PizzaCreatorAdmin from './components/PizzaCreatorAdmin';
import "./main.css"

ReactDOM.render(
  (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <PizzaCreatorAdmin/>
    </BrowserRouter>
  ),
  document.querySelector('#app')
);
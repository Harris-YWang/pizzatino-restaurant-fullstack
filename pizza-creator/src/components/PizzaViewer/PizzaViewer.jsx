import React from 'react';
import board from '../../assets/board.svg';
import base from '../../assets/base.svg';
import './PizzaViewer.css';

const Previewer = ({ selectedToppings }) => (
  <div>
    <h1 className='heading'>Pizzatino Pizza Creator</h1>
    <div className='pizza-viewer'>
      <div className='pizza-container'>
        <div className='pizza-board'>
          <img src={board} alt='Pizza board' />
        </div>
        <div className='pizza-base'>
          <img src={base} alt='Pizza base' />
        </div>
        <div className='pizza-toppings'>
          {selectedToppings.map(selectedTopping => (
            <img
              key={selectedTopping.name}
              src={require(`../../assets/toppings/pizza-view/${selectedTopping.name}.svg`)}
              alt={selectedTopping.name}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Previewer;

import React, { Component } from 'react';
import './App.css';

import Form from './components/Form';
import Recipes from './components/Recipes';

const API_KEY1 = 'bb0aea96939cf5c2e440331b89c8d788';
const API_KEY2 = '7cacd5e49cad83e524761673d35711e0';

class App extends Component {
  state = {
    recipes: []
  };

  getRecipe = async e => {
    const keyword = e.target.elements.recipeName.value;
    const recipeName =
      keyword.search('pizza') !== -1 ? keyword : keyword + ' pizza';
    e.preventDefault();
    const api_call = await fetch(
      `http://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY2}&q=${recipeName}&count=9`
    );

    const data = await api_call.json();
    this.setState({ recipes: data.recipes });
  };

  componentDidMount = () => {
    const json = localStorage.getItem('recipes');
    const recipes = JSON.parse(json);
    this.setState({ recipes });
  };

  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem('recipes', recipes);
  };

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Pizzatino Restaurant</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Recipe extends Component {
  state = {
    activeRecipe: []
  };
  componentDidMount = async () => {
    const title = this.props.location.state.recipe;
    const API_KEY1 = 'bb0aea96939cf5c2e440331b89c8d788' 
    const API_KEY2 = '7cacd5e49cad83e524761673d35711e0';
    const req = await fetch(
      `http://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY2}&q=${title}&count=1`
    );

    const res = await req.json();
    this.setState({ activeRecipe: res.recipes[0] });
  };
  render() {
    const recipe = this.state.activeRecipe;
    return (
      <div className='container'>
        {this.state.activeRecipe.length !== 0 && (
          <div className='active-recipe'>
            <img
              className='active-recipe__img'
              src={recipe.image_url}
              alt={recipe.title}
            />
            <h3 className='active-recipe__title'>{recipe.title}</h3>
            <h4 className='active-recipe__publisher'>
              Publisher: <span>{recipe.publisher}</span>
            </h4>
            <p className='active-recipe__website'>
              Website:
              <span>
                <a href={recipe.publisher_url}>{recipe.publisher_url}</a>
              </span>
            </p>
            <button className='active-recipe__button'>
              <Link to='/'>Go Home</Link>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Recipe;

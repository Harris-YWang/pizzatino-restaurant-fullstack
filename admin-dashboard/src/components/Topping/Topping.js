import React from 'react';
import axios from 'axios';
import ItemTable from '../ItemTable';
import Card, { H2 } from '../Card';
import AddNewItemForm from '../AddNewItemForm/AddNewItemForm';

class Topping extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toppings: [],
    };

    this.onNewToppingAdded = this.onNewToppingAdded.bind(this);
    this.onToppingDelete = this.onToppingDelete.bind(this);
  }
  
  //TODO: create cache to avoid calling everytime
  componentDidMount() {
    fetch('https://pizza-admin-api.herokuapp.com/product')
      .then((response) => response.json())
      .then((product) => {
        const toppings = product.filter(product => {
          if(product.type === "toppings") return product;
        })
        this.setState({
          toppings,
        });
      });
  }

  componentWillUnmount() {
    console.log("Topping Unmount")
  }

  onNewToppingAdded(topping) {
    const { toppings } = this.state;

    this.setState({
      toppings: [
        ...toppings,
        topping,
      ],
    })
  }

  onToppingDelete(id) {
    const { toppings } = this.state;

    axios.delete(`https://pizza-admin-api.herokuapp.com/product/${id}`)
      .then(res => {
        this.setState({
          toppings: toppings.filter(topping => topping.id !== id),
        });
      });
  }

  
  render() {
    const { toppings } = this.state;

    return (
      <div>
        <Card title={(<H2>Toppings</H2>)}>
          <ItemTable 
            items={toppings} 
            onItemDelete={this.onToppingDelete} 
          />
        </Card>
        <br />
        <br />
        <Card title={(<H2>Add New Topping</H2>)}>
          <AddNewItemForm  
            type="toppings" 
            onNewItemAdded={this.onNewToppingAdded}
          />
        </Card>
      </div>
    )
  }
};

export default Topping;
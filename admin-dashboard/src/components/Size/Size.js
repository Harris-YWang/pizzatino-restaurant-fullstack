import React from 'react';
import axios from 'axios';
import AddNewItemForm from '../AddNewItemForm/AddNewItemForm';
import Card, { H2 } from '../Card';
import ItemTable from '../ItemTable';

class Size extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sizes: [],
    };

    this.onNewSizeAdded = this.onNewSizeAdded.bind(this);
    this.onSizeDelete = this.onSizeDelete.bind(this);
  }
  
  //TODO: create cache to avoid calling everytime
  componentDidMount() {
    fetch('https://pizza-admin-api.herokuapp.com/product')
      .then((response) => response.json())
      .then((product) => {
        const sizes = product.filter(product => {
          if(product.type === "sizes") return product;
        })
        this.setState({
          sizes,
        });
      });
  }

  componentWillUnmount() {
    console.log("Size Unmount")
  }

  onNewSizeAdded(size) {
    const { sizes } = this.state;

    this.setState({
      sizes: [
        ...sizes,
        size,
      ],
    })
  }

  onSizeDelete(id) {
    const { sizes } = this.state;

    axios.delete(`https://pizza-admin-api.herokuapp.com/product/${id}`)
      .then(res => {
        this.setState({
          sizes: sizes.filter(size => size.id !== id),
        });
      });
  }

  render() {
    const { sizes } = this.state;
    return (
      <div>
        <Card title={(<H2>Size</H2>)}>
          <ItemTable 
            items={sizes} 
            onItemDelete={this.onSizeDelete}
           />
        </Card>
        <br />
        <br />
        <Card title={(<H2>Add New Size</H2>)}>
          <AddNewItemForm  
            type="sizes" 
            onNewItemAdded={this.onNewSizeAdded}
          />
        </Card>
      </div>
    )
  }
};

export default Size;
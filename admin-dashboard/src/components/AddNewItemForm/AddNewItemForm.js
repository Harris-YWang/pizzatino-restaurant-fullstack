import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from '../Button';

const FormItem = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-gap: 1rem;
`;

//input validation and label;
const Input = styled.input`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 32px;
  padding: 4px 11px;
  color: rgba(0,0,0,0.65);
  font-size: 14px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
`

class AddNewItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: {
      },
    };

    this.onItemChange = this.onItemChange.bind(this);
  }

  onItemChange(key, value) {
    const { item } = this.state;
    
    this.setState({
      item: {
        ...item,
        [key]: value,
      },
    });
  }

  render() {
    const { item } = this.state;
    const { onNewItemAdded, type } = this.props;

    return (
      <form 
        onSubmit={(event) => {
          event.preventDefault();
          item['type'] = type;
          item['price'] = parseFloat(item.price);
          axios.post('https://pizza-admin-api.herokuapp.com/product', item)
            .then(({ data }) => onNewItemAdded(data))
        }}
      >
          <FormItem>
            <Input
              value={item.image || ''} 
              onChange={({ target: { value } }) => this.onItemChange('image', value)} 
              placeholder="Image URL" 
            />
            <Input
              value={item.name || ''} 
              onChange={({ target: { value } }) => this.onItemChange('name', value)} 
              placeholder="Name" 
            />
            <Input
              value={item.price || ''} 
              onChange={({ target: { value } }) => this.onItemChange('price', value)} 
              placeholder="Price" 
            />
          </FormItem>
          <br />
          <Button color='primary'>Add</Button>
      </form>
    );
  }
}

export default AddNewItemForm;
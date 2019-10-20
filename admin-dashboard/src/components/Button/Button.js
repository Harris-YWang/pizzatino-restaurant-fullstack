import styled from 'styled-components';


const Button = styled.button`
  text-align: center;
  border: 1px solid transparent;
  cursor: pointer;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  color: rgba(0,0,0,0.65);
  background-color: #fff;
  border-color: #d9d9d9;

  :hover {
    color: #40a9ff;
    border-color: #40a9ff; 
  }

  ${({ color }) => color === 'danger' && `
    color: #f5222d;
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    :hover {
      color: white; 
      background-color: #f5222d;
      border-color: #f5222d;
    }
  `}

${({ color }) => color === 'primary' && `
    color: white;
    background-color: #40a9ff;
    border-color: #40a9ff;
    :hover {
      color: white; 
      border-color: #40a9ff; 
      background-color: #40a9ff;
    }
  `}
`;

export default Button;
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Side = styled.div`
  --padding: 1rem 2rem;
  background: #001529;
  color: white;
`;

const Brand = styled.div`
  background: #002140;
  display: flex;
  padding: var(--padding);
`;

const Menu = styled.div`
  display: grid;
  padding: var(--padding);
`;

const H1 = styled.h1`
  font-size: 1.5rem;
`
const Link = styled(NavLink).attrs({
  exact:true,
  activeClassName: 'active',
})`
  text-decoration: none;
  padding: 0.5rem 0;
  color: rgba(255, 255, 255, 0.5);
  &.active {
    color: white;
  }
  :hover {
    color: white;
  }
`

const Sidebar = () => (
  <Side >
    <Brand>
      <H1>Pizza Creator Admin</H1>
    </Brand>
    <Menu>
      <Link to="/">Home</Link>
      <Link to="/topping">Topping</Link>
      <Link exact activeClassName='active' to="/size">Size</Link>
    </Menu>
  </Side>
);

export default Sidebar;
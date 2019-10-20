import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Topping from '../Topping';
import Size from '../Size';

const App = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100vh;
`;

const Content = styled.div`
  padding: 2rem 2rem 2rem 4rem;
`;

const PizzaCreatorAdmin = () => (
  <App>
    <Sidebar />
    <Content>
      <Switch>
        <Route
          exact
          path="/"
          component={Topping}
        />
        <Route
          exact
          path="/topping"
          component={Topping}
        />
        <Route
          exact
          path="/size"
          component={Size}
        />
        <Route
          render = {() => (
           <Topping />
          )}
        />
      </Switch>
    </Content>
  </App>
);

export default PizzaCreatorAdmin;
import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  --padding: 1rem 1.5rem;
  --border: 1px solid #e8e8e8;

  background-color: white;
  border: 1px solid #e8e8e8;
 `;

const Header = styled.div`
  padding: var(--padding);
  border-bottom: var(--border);
`;


const Content = styled.div`
  padding: var(--padding);
`;

const Card = ({
  children,
  title,
}) => (
  <StyledCard>
    <Header>
      {title}
    </Header>
    <Content>
      {children}
    </Content>
  </StyledCard>
);

export default Card;
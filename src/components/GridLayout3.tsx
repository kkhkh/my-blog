import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  width: 600px;
  height: 300px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px 20px;
`;

const Item1 = styled.div`
  border: 1px black solid;
  grid-row: 1;
  grid-column: 1/3;
`;
const Item2 = styled.div`
  border: 1px black solid;
  grid-row: 1;
  grid-column: 3;
`;
const Item3 = styled.div`
  border: 1px black solid;
  grid-row: 2/4;
  grid-column: 3;
`;
const Item4 = styled.div`
  border: 1px black solid;
  grid-row: 3;
  grid-column: 1/3;
`;
const Item5 = styled.div`
  border: 1px black solid;
  grid-row: 2;
  grid-column: 1;
`;
const Item6 = styled.div`
  border: 1px black solid;
  grid-row: 2;
  grid-column: 2;
`;

const GridLayout = () => {
  return (
    <Container>
      <Item1>Item</Item1>
      <Item2>Item</Item2>
      <Item3>Item</Item3>
      <Item4>Item</Item4>
      <Item5>Item</Item5>
      <Item6>Item</Item6>
    </Container>
  );
};

export default GridLayout;

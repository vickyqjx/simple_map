// import the hook
import React from "react";

// import the bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Import the Context Provider
import { LocationContextProvider } from "./context";

import Favorites from "./Favorites";
import AddressSearch from "./AddressSearch";


function MainContainer() {
  return (
    <Container>
      <LocationContextProvider>
        <Row>
          <Col xs={12} md={8}>
            <AddressSearch />
          </Col>
          <Col xs={12} md={4}>
            <Favorites />
          </Col>
        </Row>
      </LocationContextProvider>
    </Container>
  );
}

export default MainContainer;

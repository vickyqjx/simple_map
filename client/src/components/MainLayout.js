// import the hook
import React from "react";
// import the bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import the Context Provider
import { LocationContextProvider } from "../context";
// import project components
import FavoritesList from "./favorites/List";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";


function MainLayout() {
  const address='1 Flinders St, Melbourne VIC 3000';

  return (
    <Container>
      <LocationContextProvider selectedAddress={address} searchAddress={address}>
        <Row>
          <Col xs={12} md={8}>
            <SearchBar />
            <SearchResults address={address} />
          </Col>
          <Col xs={12} md={4}>
            <FavoritesList />
          </Col>
        </Row>
      </LocationContextProvider>
    </Container>
  );
}

export default MainLayout;

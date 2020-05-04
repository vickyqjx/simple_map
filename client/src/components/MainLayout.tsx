// import the hook
import React from "react";
// import the bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
// import the Context Provider
import LocationProvider from "../context/LocationContext";
// import project components
import FavoritesList from "./favorites/List";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const MainLayout = () => (
  <Container>
    <LocationProvider initAddress="1 Flinders St, Melbourne VIC 3000" >
      <Row>
        <Col xs={12} md={8}>
          <SearchBar />
          <SearchResults />
        </Col>
        <Col xs={12} md={4}>
          <Jumbotron className="h-100">
            <h5>Favorites List</h5>
            <FavoritesList />
          </Jumbotron>
        </Col>
      </Row>
    </LocationProvider>
  </Container>
)

export default MainLayout;

import React from 'react';
//import { render } from 'react-dom';
//import logo from './logo.svg';
//import './css/App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ApolloProvider } from '@apollo/react-hooks';
import { createClient } from "./utils/apollo";
import Favorites from "./components/Favorites";
import AddressSearch from "./components/AddressSearch";

function App() {
  const client = createClient();
  return (
    <ApolloProvider client={client}>
      <Container>
        <Row className="justify-content-center">
          <div className="text-center">
             <h1>Simple Map App</h1>
          </div>
        </Row>
        <Row>
          <Col xs={12} md={8}>
            <AddressSearch />
          </Col>
          <Col xs={12} md={4}>
            <Favorites />
          </Col>
        </Row>
      </Container>
    </ApolloProvider>
  );
}

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;

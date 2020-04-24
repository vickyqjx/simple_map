import React from 'react';
//import { render } from 'react-dom';
//import logo from './logo.svg';
//import './css/App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import { createClient } from "./utils/apollo";
import Favorites from "./components/Favorites";
import AddressSearch from "./components/AddressSearch";

function App() {
  const client = createClient();
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <AddressSearch />
        <Favorites />
      </div>
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

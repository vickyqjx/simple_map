import React from 'react';
//import { render } from 'react-dom';
//import logo from './logo.svg';
import './css/App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import { createClient } from "./utils/apollo";
import Header from "./components/ui/Header";
import MainLayout from "./components/MainLayout";

function App() {
  const client = createClient();
  return (
    <ApolloProvider client={client}>
      <Header text="Simple Map App" />
      <MainLayout />
    </ApolloProvider>
  );
}

export default App;

import React from 'react';
import './css/App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import { createClient } from "./utils/apollo";
import Header from "./components/ui/Header";
import MainLayout from "./components/MainLayout";

const App = () => (
  <ApolloProvider client={createClient}>
    <Header text="Simple Map App" />
    <MainLayout />
  </ApolloProvider>
)

export default App;

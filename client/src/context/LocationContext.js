import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const Context = createContext({});

export const Provider = props => {
  // Initial values are obtained from the props
  const {
    selectedAddress: initialSelectedAddress,
    searchAddress: initialSearchAddress,
    children
  } = props;

  // Use State to keep the values
  const [selectedAddress, setSelectedAddress] = useState(initialSelectedAddress);
  const [searchAddress, setSearchAddress] = useState(initialSearchAddress);

  // Make the context object:
  const loationContext = {
    selectedAddress, //address display on the text field
    setSelectedAddress,
    searchAddress, //address is used to pass to the backend
    setSearchAddress
  };

  // pass the value in provider and return
  return <Context.Provider value={loationContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

Provider.propTypes = {
  selectedAddress: PropTypes.string,
  searchAddress: PropTypes.string,
};

Provider.defaultProps = {
  selectedAddress: '',
  searchAddress: '',
};

// Import the hook
import React, { useContext } from 'react';
// Import the bootstrap components
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
// Import the Context
import { LocationContext } from '../context';

import Add from './favorites/Add';

function SearchBar() {
  //get the selected address from the LocationContext
  const {
    selectedAddress,
    setSelectedAddress,
    setSearchAddress,
  } = useContext(LocationContext);

  const keyPressed = (event) => {
    if (event.key === "Enter") {
      setSearchAddress(selectedAddress);
    }
    return;
  }

  return (
    <InputGroup>
      <FormControl
        placeholder="Address"
        aria-label="Address"
        aria-describedby="basic-addon"
        value={selectedAddress}
        onChange={(e) => setSelectedAddress(e.target.value)}
        onKeyPress={keyPressed}
      />
      <Button variant="outline-secondary" onClick={() => setSearchAddress(selectedAddress)}>Search</Button>
      <Add />
    </InputGroup>
  );
}

export default SearchBar;

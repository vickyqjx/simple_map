// import the hook
import React, { useContext } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { withApollo } from 'react-apollo';
import { gql } from 'apollo-boost';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchResults from './SearchResults';

//Import the Context
import { LocationContext } from "./context";

function AddressSearch() {
  //get the selected address from the LocationContext
  const { selectedAddress } = useContext(LocationContext);

  const locationContext = useContext(LocationContext);
  const { setSelectedAddress } = locationContext;

  return (
    <div>
      <InputGroup>
        <FormControl
          placeholder="Address"
          aria-label="Address"
          aria-describedby="basic-addon"
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
        />
      </InputGroup>
      <SearchResults address={selectedAddress} />
    </div>
  );
}

export default AddressSearch;

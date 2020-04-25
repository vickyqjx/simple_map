// import the hook
import React, { useContext } from 'react';

import { Mutation } from 'react-apollo'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Button from 'react-bootstrap/Button';
import Map from './ui/Map';
import Coordinates from './ui/Coordinates';

//Import the Context
import { LocationContext } from "./context";

const GET_GEOCODE = gql`
  query Geocode($address: String!) {
    location(address: $address) {
      map_url
      lat
      lng
    }
  }
`;

const ADD_BOOKMARK = gql`
  mutation Add($name: String!, $address: String!) {
    addBookmark(name: $name, address: $address) {
      name
      address
    }
  }
 `;

function renderResults(loading, error, data, props) {
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (!data || !data.location) return '';
  return (
    <>
      <Coordinates latitude={data.location.lat} longitude={data.location.lng} />
      <Map url={data.location.map_url}/>
    </>
  );
}

function SearchResults(props) {
  //get the selected address from the LocationContext
  const { searchAddress } = useContext(LocationContext);

  const locationContext = useContext(LocationContext);
  const { setSearchAddress } = locationContext;

  const [
    getGeocode,
    { loading, error, data, refetch }
  ] = useLazyQuery(GET_GEOCODE, {
    variables: { address: searchAddress },
  });

  return (
    <div>
      <Button variant="outline-secondary" onClick={() => {setSearchAddress(props.address);getGeocode();}}>Search</Button>
      <Mutation mutation={ADD_BOOKMARK} variables={{ name: 'Test', address: searchAddress }}>
        {postMutation => <Button variant="outline-secondary" onClick={postMutation}>Add to Favorites</Button>}
      </Mutation>
      <div>{renderResults(loading, error, data, props)}</div>
    </div>
  );
}

export default SearchResults;

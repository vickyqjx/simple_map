// import the hook
import React, { useContext } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Map from './ui/Map';
import Coordinates from './ui/Coordinates';

//Import the Context
import { LocationContext } from "../context";

const GET_GEOCODE = gql`
  query Geocode($address: String!) {
    location(address: $address) {
      map_url
      lat
      lng
    }
  }
`;

function SearchResults(props) {
  //get the selected address from the LocationContext
  const { searchAddress } = useContext(LocationContext);

  const { loading, error, data } = useQuery(GET_GEOCODE, {
    variables: { address: searchAddress },
  })

  if (loading) return 'Loading...';
  if (error & searchAddress != '') return `Error! ${error.message}`;
  if (!data || !data.location) return '';

  return (
    <div className="margin-top">
      <h6>Search Results for: <span className="text-small font-italic font-weight-light">{searchAddress}</span></h6>
      <Coordinates latitude={data.location.lat} longitude={data.location.lng} />
      <Map url={data.location.map_url}/>
    </div>
  );
}

export default SearchResults;

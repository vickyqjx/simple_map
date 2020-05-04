// import the hook
import React, { useContext } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Map from './ui/Map';
import Coordinates from './ui/Coordinates';

//Import the Context
import { LocationCtx } from '../context/LocationContext';

const GET_GEOCODE = gql`
  query Geocode($address: String!) {
    location(address: $address) {
      map_url
      lat
      lng
    }
  }
`;

const SearchResults = () => {
  //get the selected address from the LocationContext
  const { searchAddress } = useContext(LocationCtx);

  const { loading, error, data } = useQuery(GET_GEOCODE, {
    variables: { address: searchAddress },
  })

  if (loading) return <h5>Loading...</h5>;
  if (error && error.message === 'econnrefused') return <h5>Error! Connection refused by server!</h5>;

  if (error && searchAddress !== '') return <h5>Error! ${error.message}</h5>;
  if (!data || !data.location) return <div />;

  return (
    <div className="margin-top">
      <h6>Search Results for: <span className="text-small font-italic font-weight-light">{searchAddress}</span></h6>
      <Coordinates latitude={data.location.lat} longitude={data.location.lng} />
      <Map url={data.location.map_url}/>
    </div>
  );
}

export default SearchResults;

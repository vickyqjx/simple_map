import React from 'react';
import { Mutation } from 'react-apollo'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Button from 'react-bootstrap/Button';
import Map from './ui/Map';
import Coordinates from './ui/Coordinates';

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
    <div>
      <Coordinates latitude={data.location.lat} longitude={data.location.lng} />
      <Map url={data.location.map_url}/>
    </div>
  );
}

function SearchResults(props) {
  const [
    getGeocode,
    { loading, error, data, refetch }
  ] = useLazyQuery(GET_GEOCODE, {
    variables: { address: props.address },
  });

  return (
    <div>
      <Button variant="outline-secondary" onClick={() => getGeocode()}>Search</Button>
      <Mutation mutation={ADD_BOOKMARK} variables={{ name: 'Test', address: props.address }}>
        {postMutation => <Button variant="outline-secondary" onClick={postMutation}>Submit</Button>}
      </Mutation>
      {renderResults(loading, error, data, props)}
    </div>
  );
}

export default SearchResults;

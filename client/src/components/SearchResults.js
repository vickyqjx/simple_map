import React from 'react';
import { Mutation } from 'react-apollo'
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Button from 'react-bootstrap/Button';

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
  if (loading) return "<p>Loading...</p>";
  if (error) return `<p>Error! ${error.message}</p>`;
  if (!data || !data.location) return "";
  return (
    <div>
      <div>`${data.location.lat}/${data.location.lng}`</div>
      <iframe width="400" height="300" id="gmap_canvas" src={`https://maps.google.com/maps?q=${encodeURI(props.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
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

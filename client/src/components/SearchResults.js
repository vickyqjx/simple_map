import React from 'react';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Button from 'react-bootstrap/Button';

const GET_GEOCODE = gql`
  query Geocode($address: String!) {
    geocode(address: $address) {
      map_url
      lat
      lng
    }
  }
`;

function SearchResults(props) {
  const [
    getGeocode,
    { loading, error, data, refetch }
  ] = useLazyQuery(GET_GEOCODE, {
    variables: { address: props.address },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data || !data.geocode) return <p><Button variant="outline-secondary" onClick={() => getGeocode()}>Search</Button></p>;

  return (
    <div>
    <Button variant="outline-secondary" onClick={() => getGeocode()}>Search</Button>
      <div>`${data.geocode.lat}/${data.geocode.lng}`</div>
      <iframe width="400" height="300" id="gmap_canvas" src={`https://maps.google.com/maps?q=${encodeURI(props.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
    </div>
  );
}

export default SearchResults;

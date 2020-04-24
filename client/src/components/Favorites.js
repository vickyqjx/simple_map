import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const FAVORITES = gql`
  {
    allBookmarks {
      id
      name
      address
    }
  }
`;

function Favorites() {
  const { loading, error, data } = useQuery(FAVORITES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {data.allBookmarks.map(location => (
        <li key={location.id}>
          {location.name}: {location.address}
        </li>
      ))}
    </ul>
  );
}

export default Favorites;

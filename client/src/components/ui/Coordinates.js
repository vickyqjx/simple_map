import React from 'react';

function Coordinates({latitude, longitude}) {
  return (
    <>
      <div><strong>Latitude: </strong>{latitude}</div>
      <div><strong>Longitude: </strong>{longitude}</div>
    </>
  );
}

export default Coordinates;

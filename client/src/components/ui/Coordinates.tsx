import React from 'react';

type CoordinatesProps = {
  latitude: string,
  longitude: string,
}

const Coordinates = ({latitude, longitude}: CoordinatesProps) => (
  <>
    <div className="text-small"><strong>Latitude: </strong>{latitude}</div>
    <div className="text-small"><strong>Longitude: </strong>{longitude}</div>
  </>
)

export default Coordinates;

// Import the hook
import React, { useContext } from 'react';
// Import the bootstrap component
import ListGroup from 'react-bootstrap/ListGroup';
// Import the Context
import { LocationContext } from '../../context';
import Remove from './Remove';

function Item({location}) {

  const {
    searchAddress,
    setSelectedAddress,
    setSearchAddress
  } = useContext(LocationContext);

  if (location.address == null) {
    return (<></>);
  }

  return (
    <ListGroup.Item as="li" key={location.id} active={location.address === searchAddress} variant="light" className="d-flex justify-content-between">
      <div
        className="text-small text-hover"
        onClick={() => {setSelectedAddress(location.address); setSearchAddress(location.address)}}
      >
        <span className="text-capitalize font-weight-bold">{location.name}</span>: {location.address}
      </div>
      <Remove id={location.id} />
    </ListGroup.Item>
  );
}

export default Item;

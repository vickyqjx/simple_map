// import the hook
import React, { useContext } from 'react';
//Import the Context
import { LocationContext } from '../../context';

function Item({location}) {
  const { setSelectedAddress, setSearchAddress } = useContext(LocationContext);

  return (
    <li key={location.id} onClick={() => {setSelectedAddress(location.address); setSearchAddress(location.address)}}>
      {location.name}: {location.address}
    </li>
  );
}

export default Item;

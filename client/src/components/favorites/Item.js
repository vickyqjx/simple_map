// import the hook
import React, { useContext } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import ListGroup from 'react-bootstrap/ListGroup';

//Import the Context
import { LocationContext } from '../../context';

function Item({location}) {

  const {
    searchAddress,
    setSelectedAddress,
    setSearchAddress
  } = useContext(LocationContext);

  const REMOVE_BOOKMARK = gql`
    mutation Remove($id: String!) {
      removeBookmark(id: $id) {
        id
      }
    }`;

  if (location.address == null) {
    return (<></>);
  }

  return (
    <ListGroup.Item as="li" key={location.id} active={location.address == searchAddress} variant="light" className="d-flex justify-content-between">
      <div
        className="text-small text-hover"
        onClick={() => {setSelectedAddress(location.address); setSearchAddress(location.address)}}
      >
        <span className="text-capitalize font-weight-bold">{location.name}</span>: {location.address}
      </div>
      <Mutation mutation={REMOVE_BOOKMARK} variables={{ id: location.id }}>
        {postMutation => <span onClick={() => postMutation()} className="font-weight-bold small-margin-top-left icon-hover">X</span>}
      </Mutation>
    </ListGroup.Item>
  );
}

export default Item;

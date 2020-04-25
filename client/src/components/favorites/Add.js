import React, { useState, useContext } from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//Import the Context
import { LocationContext } from '../../context';

const ADD_BOOKMARK = gql`
  mutation Add($name: String!, $address: String!) {
    addBookmark(name: $name, address: $address) {
      name
      address
    }
  }
 `;

function Add() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //get the selected address from the LocationContext
  const { selectedAddress } = useContext(LocationContext);

  const renderModal = () => (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Mutation mutation={ADD_BOOKMARK} variables={{ name: name, address: selectedAddress }}>
          {postMutation => <Button variant="primary" onClick={() => {postMutation(); handleClose()}}>Save</Button>}
        </Mutation>
      </Modal.Footer>
    </Modal>
  )

  return (
    <>
      <Button variant="outline-secondary" onClick={handleShow}>
        Save
      </Button>
      {renderModal()}
    </>
  );
}

export default Add;

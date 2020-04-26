import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

function Item({id}) {
  const REMOVE_BOOKMARK = gql`
    mutation Remove($id: String!) {
      removeBookmark(id: $id) {
        id
      }
    }`;

  return (
    <Mutation mutation={REMOVE_BOOKMARK} variables={{ id: id }}>
      {postMutation => <span onClick={() => postMutation()} className="font-weight-bold small-margin-top-left icon-hover">X</span>}
    </Mutation>
  );
}

export default Item;

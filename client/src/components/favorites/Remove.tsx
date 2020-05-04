import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const REMOVE_BOOKMARK = gql`
  mutation Remove($id: String!) {
    removeBookmark(id: $id) {
      id
    }
  }`;

interface ItemProps {
  id?: string
}

const Item = ({ id }: ItemProps) => {
  return (
    <Mutation mutation={REMOVE_BOOKMARK} variables={{ id: id }}>
      {postMutation => <span
        onClick={() => postMutation().catch(res => {
          const errors = res.graphQLErrors.map(error => error.message);
          console.log(errors);
        })}
        className="font-weight-bold small-margin-top-left icon-hover"
      >
        X
      </span>}
    </Mutation>
  );
}

export default Item;

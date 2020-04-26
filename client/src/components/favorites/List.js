import React from 'react';
import { Query } from "react-apollo";
import { gql } from 'apollo-boost';
import produce from "immer";
// Import the bootstrap components
import Jumbotron from 'react-bootstrap/Jumbotron';
import ListGroup from 'react-bootstrap/ListGroup';

import Subscriber from '../../utils/subscriber';
import Item from './Item';


const FAVORITES = gql`
  {
    allBookmarks {
      id
      name
      address
    }
  }
`;

const BOOKMARKS_SUBSCRIPTION = gql`
   subscription onBookmarkCreated {
     bookmarkCreated {
       id
       name
       address
     }
   }
 `

function List() {
  return (
    <Jumbotron className="h-100">
      <h5>Favorites List</h5>
      <Query query={FAVORITES}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <Subscriber subscribeToNew={() =>
                subscribeToMore({
                  document: BOOKMARKS_SUBSCRIPTION,
                  updateQuery: (prev, { subscriptionData }) => {
                    // if nothing is coming through the socket, just use the current data
                    if (!subscriptionData.data) return prev;

                    // something new is coming in!
                    const newBookmark = subscriptionData.data.bookmarkCreated;

                    // Check that we don't already have the bookmark stored.
                    if (prev.allBookmarks.find((bookmark) => bookmark.id === newBookmark.id)) {
                      return prev;
                    }

                    return produce(prev, (next) => {
                      // Add that new bookmark!
                      next.allBookmarks.unshift(newBookmark);
                    });
                  },
                })
              }>
              <ListGroup as="ul">
                {data.allBookmarks.map(location => (
                  <Item location={location} key={location.id} />
                ))}
              </ListGroup>
          </Subscriber>
          );
        }}
      </Query>
    </Jumbotron>
  );
}

export default List;

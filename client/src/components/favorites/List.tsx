import React from 'react';
import { Query } from "react-apollo";
import { ApolloError } from 'apollo-client';
import { gql } from 'apollo-boost';
import produce from "immer";
// Import the bootstrap components
import ListGroup from 'react-bootstrap/ListGroup';

import Subscriber from '../../utils/subscriber';
import Item from './Item';

interface Bookmark {
  id: string;
  name: string;
  address: string;
}

interface Bookmarks {
  allBookmarks?: Bookmark[];
}

interface BookmarksViewProps {
  allBookmarks: Bookmark[];
  error?: ApolloError;
  loading: boolean;
  subscribeToMore:  (options) => () => void;
}

const BOOKMARKS_SUBSCRIPTION = gql`
   subscription onBookmarkCreated {
     bookmarkCreated {
       id
       name
       address
     }
   }
 `

const BookmarksView = ({ allBookmarks, error, loading, subscribeToMore }: BookmarksViewProps) => {
  if (loading) return <h5>Loading...</h5>;
  if (error) return <h5>`Error! ${error.message}`</h5>;

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
        {allBookmarks.map(location => (
          <Item location={location} key={location.id} />
        ))}
      </ListGroup>
  </Subscriber>
  );
};

const FAVORITES = gql`
  query {
    allBookmarks {
      id
      name
      address
    }
  }
`;

const List =  () => (
  <Query <Bookmarks, {}> query={FAVORITES}>
    {({ data: { allBookmarks = [] } = {}, error, loading, subscribeToMore }) => (
      <BookmarksView
        allBookmarks={allBookmarks}
        error={error}
        loading={loading}
        subscribeToMore={subscribeToMore}
      />
   )}
  </Query>
);

export default List;

import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Query } from "react-apollo";
import { gql } from 'apollo-boost';
import produce from "immer";
import Subscriber from "../utils/subscriber";

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

function Favorites() {
  return (
    <>
      <h5>Favorites</h5>
      <Query query={FAVORITES}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <Subscriber subscribeToNew={() =>
                subscribeToMore({
                  document: BOOKMARKS_SUBSCRIPTION,
                  updateQuery: (prev, { subscriptionData }) => {
                    console.log('----111----');
                    console.log(subscriptionData);
                    // if nothing is coming through the socket, just use the current data
                    if (!subscriptionData.data) return prev;

                    // something new is coming in!
                    const newBookmark = subscriptionData.data.bookmarkCreated;

                    console.log('----222----');
                    console.log(newBookmark);

                    // Check that we don't already have the bookmark stored.
                    if (prev.allBookmarks.find((bookmark) => bookmark.id === newBookmark.id)) {
                      return prev;
                    }

                    console.log('----33333----');

                    return produce(prev, (next) => {
                      // Add that new bookmark!
                      console.log(newBookmark);
                      next.allBookmarks.unshift(newBookmark);
                    });
                  },
                })
              }>
              <ul>
                {data.allBookmarks.map(location => (
                  <li key={location.id}>
                    {location.name}: {location.address}
                  </li>
                ))}
              </ul>
          </Subscriber>
          );
        }}
      </Query>
    </>
  );
}

export default Favorites;

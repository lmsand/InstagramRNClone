import {gql} from '@apollo/client'

export const getUser = /* GraphQL */ gql`
query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    image
    bio
    username
    website
    nofPosts
    nofFollowers
    nofFollowings
    email
    Posts {
      nextToken
      __typename
      items {
        id
        image
        images
        video
      }
    }
    createdAt
    updatedAt
    __typename
  }
}`

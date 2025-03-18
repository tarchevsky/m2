import { gql } from '@apollo/client'

export const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      name
      slug
      posts {
        edges {
          node {
            id
            slug
            title
            excerpt
          }
        }
      }
    }
  }
`

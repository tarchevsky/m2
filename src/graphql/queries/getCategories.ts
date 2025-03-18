import { gql } from '@apollo/client'

export const GET_CATEGORIES = gql`
  query CategoriesById($categoryIds: [ID!]) {
    categories(where: { include: $categoryIds }) {
      edges {
        node {
          slug
          name
          id
        }
      }
    }
  }
`

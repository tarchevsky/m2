import { gql } from '@apollo/client'

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
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

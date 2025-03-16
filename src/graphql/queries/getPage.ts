import { gql } from '@apollo/client'

export const GET_PAGE = gql`
  query GetPage($id: ID!) {
    page(id: $id) {
      title
      pagecontent {
        hero {
          heroBtn
          heroText
          heroImage {
            node {
              altText
              link
            }
          }
        }
        address
        caption
        email
      }
      content
      seo {
        metaDesc
        title
      }
    }
  }
`

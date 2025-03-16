import { gql } from '@apollo/client';

export const GET_POSTS = gql`
    query PostsContents {
        posts {
            edges {
                node {
                    id
                    excerpt
                    title
                    slug
                }
            }
        }
    }
`;
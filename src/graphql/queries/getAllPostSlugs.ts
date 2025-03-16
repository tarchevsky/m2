import { gql } from '@apollo/client';

export const GET_ALL_POST_SLUGS = gql`
    query AllPostSlugs {
        posts {
            nodes {
                slug
            }
        }
    }
`;
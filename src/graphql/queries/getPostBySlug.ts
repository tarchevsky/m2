import { gql } from '@apollo/client';

export const GET_POST_BY_SLUG = gql`
    query PostBySlug($slug: String!) {
        generalSettings {
            title
        }
        postBy(slug: $slug) {
            id
            date
            content
            title
            slug
            featuredImage {
                node {
                    link
                    altText
                }
            }
            seo {
                title
                metaDesc
            }
        }
    }
`;
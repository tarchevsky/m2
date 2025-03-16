// src/lib/seo.ts
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { getApolloClient } from '@/lib/apollo-client';
import { GET_PAGE } from '@/graphql/queries/getPage';
import { PageData } from '@/graphql/types/pageTypes';

export async function fetchSeoMetadata(id: string): Promise<{ title: string; description: string }> {
    const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient();

    try {
        const { data } = await apolloClient.query<PageData>({
            query: GET_PAGE,
            variables: { id },
        });

        const seo = data?.page?.seo;

        return {
            title: seo?.title || 'Default Title',
            description: seo?.metaDesc || 'Default Description',
        };
    } catch (error) {
        console.error('Error fetching SEO metadata:', error);
        return {
            title: 'Default Title',
            description: 'Default Description',
        };
    }
}
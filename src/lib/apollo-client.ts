// lib/apollo-client.ts

import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	link: new HttpLink({
		uri: process.env.WORDPRESS_GRAPHQL_ENDPOINT
	}),
	cache: new InMemoryCache(),
});

export const getApolloClient = () => client;
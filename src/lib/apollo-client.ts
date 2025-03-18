// lib/apollo-client.ts

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'

// Используем разные экземпляры клиента для серверного и клиентского рендеринга
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // true для серверного рендеринга
    link: new HttpLink({
      uri: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
      // Дополнительные настройки, например, заголовки авторизации, если нужно
      // headers: { ... }
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache', // Для ISR лучше не использовать кеширование запросов
        errorPolicy: 'all',
      },
    },
  })
}

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // Если есть начальное состояние, восстанавливаем его
  if (initialState) {
    // Получаем существующий кеш
    const existingCache = _apolloClient.cache.extract()

    // Восстанавливаем кеш с объединенными данными
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  // Для SSG и SSR всегда создаем новый клиент
  if (typeof window === 'undefined') return _apolloClient

  // Создаем клиент один раз для клиентской стороны
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function getApolloClient() {
  return initializeApollo()
}

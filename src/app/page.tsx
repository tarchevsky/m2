import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Metadata } from 'next'

import Hero from '@/components/hero/Hero'
import { getApolloClient } from '@/lib/apollo-client'
import { fetchSeoMetadata } from '@/lib/seo'

import PostsList from '@/components/postsList/PostsList'
import { GET_PAGE } from '@/graphql/queries/getPage'
import { GET_POSTS } from '@/graphql/queries/getPosts'
import { PageData } from '@/graphql/types/pageTypes'
import { PostProps, PostsData } from '@/graphql/types/postTypes'
import { wpToTailwind } from '@/utils/wpToTailwind'

export async function generateMetadata(): Promise<Metadata> {
  const pageId = 'cG9zdDo1Mw==' // Замените на соответствующий ID для главной страницы
  const seo = await fetchSeoMetadata(pageId)

  return {
    title: seo.title,
    description: seo.description,
  }
}

const HomePage = async () => {
  const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

  const pageId = 'cG9zdDo1Mw==' // ID твоей главной страницы

  // Параллельное выполнение запросов
  const [pageResult, postsResult] = await Promise.all([
    apolloClient.query<PageData>({
      query: GET_PAGE,
      variables: { id: pageId },
    }),
    apolloClient.query<PostsData>({
      query: GET_POSTS,
    }),
  ])

  const page = pageResult.data.page
  const hero = page.pagecontent.hero

  const postsData = postsResult.data
  // Обработка данных постов
  const posts: PostProps[] =
    postsData?.posts.edges.map(({ node }) => ({
      ...node,
      path: `/posts/${node.slug}`,
      // Добавьте другие поля, если необходимо
    })) || []

  return (
    <div>
      {page.pagecontent && (
        <Hero
          src={hero.heroImage.node.link}
          alt={hero.heroImage.node.altText || 'Альтернативный текст'}
        />
      )}
      {page.content && (
        <div dangerouslySetInnerHTML={{ __html: wpToTailwind(page.content) }} />
      )}
      <PostsList posts={posts} /> {/* Используем новый компонент */}
    </div>
  )
}

export default HomePage

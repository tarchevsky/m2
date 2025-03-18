import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Metadata } from 'next'

import Hero from '@/components/hero/Hero'
import IsrDebugIndicator from '@/components/IsrDebugIndicator'
import { getApolloClient } from '@/lib/apollo-client'
import { fetchSeoMetadata } from '@/lib/seo'

import CarouselBeyond from '@/components/carouselBeyond/CarouselBeyond'
import CategoryLinks from '@/components/categoryLinks/CategoryLinks'
import CategoryPosts from '@/components/categoryPosts/CategoryPosts'
import PostsByCategories from '@/components/postsByCategories/PostsByCategories'
import PostsList from '@/components/postsList/PostsList'
import { GET_CATEGORIES } from '@/graphql/queries/getCategories'
import { GET_CATEGORY } from '@/graphql/queries/getCategory'
import { GET_PAGE } from '@/graphql/queries/getPage'
import { GET_POSTS } from '@/graphql/queries/getPosts'
import { GET_POSTS_BY_CATEGORIES } from '@/graphql/queries/getPostsByCategories'
import { CategoriesData } from '@/graphql/types/categoriesTypes'
import { CategoryPostsData } from '@/graphql/types/categoryPostsTypes'
import { CategoryData, CategoryPostProps } from '@/graphql/types/categoryTypes'
import { PageData } from '@/graphql/types/pageTypes'
import { PostProps, PostsData } from '@/graphql/types/postTypes'
import { wpToTailwind } from '@/utils/wpToTailwind'

export const revalidate = 3600 // Ревалидация каждый час (3600 секунд)

// ID константы
const PAGE_ID = 'cG9zdDo1Mw=='
const CATEGORY_ID = 'dGVybToz'
const FEATURE_CATEGORY_IDS = ['dGVybTo1', 'dGVybTo0']
const CATEGORY_IDS = ['dGVybTo0', 'dGVybTo1']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoMetadata(PAGE_ID)

  return {
    title: seo.title,
    description: seo.description,
  }
}

const HomePage = async () => {
  // Добавим время последней генерации страницы для проверки ISR
  const generationTime = new Date().toISOString()

  const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

  // Параллельное выполнение запросов
  const [
    pageResult,
    postsResult,
    categoryResult,
    categoryPostsResult,
    categoriesResult,
  ] = await Promise.all([
    apolloClient.query<PageData>({
      query: GET_PAGE,
      variables: { id: PAGE_ID },
    }),
    apolloClient.query<PostsData>({
      query: GET_POSTS,
    }),
    apolloClient.query<CategoryData>({
      query: GET_CATEGORY,
      variables: { id: CATEGORY_ID },
    }),
    apolloClient.query<CategoryPostsData>({
      query: GET_POSTS_BY_CATEGORIES,
      variables: { categoryIds: FEATURE_CATEGORY_IDS },
    }),
    apolloClient.query<CategoriesData>({
      query: GET_CATEGORIES,
      variables: { categoryIds: CATEGORY_IDS },
    }),
  ])

  const page = pageResult.data.page
  const hero = page.pagecontent.hero

  const postsData = postsResult.data
  const categoryData = categoryResult.data.category
  const categoryPostsData = categoryPostsResult.data.posts.edges || []
  const categoriesData = categoriesResult.data.categories.edges || []

  // Обработка данных постов
  const posts: PostProps[] =
    postsData?.posts.edges.map(({ node }) => {
      const mainCategory = node.categories?.edges[0]?.node
      return {
        ...node,
        path: mainCategory
          ? `/${mainCategory.slug}/${node.slug}`
          : `/posts/${node.slug}`,
      }
    }) || []

  // Получаем посты из категории
  const categoryPosts: CategoryPostProps[] =
    categoryData?.posts.edges.map(({ node }) => ({
      ...node,
      path: `/${categoryData.slug}/${node.slug}`,
    })) || []

  // Обрабатываем посты по категориям
  const postsByCategories = categoryPostsData.map(({ node }) => {
    const mainCategory = node.categories?.edges[0]?.node
    return {
      ...node,
      path: mainCategory
        ? `/${mainCategory.slug}/${node.slug}`
        : `/posts/${node.slug}`,
    }
  })

  // Обрабатываем категории
  const categories = categoriesData.map(({ node }) => ({
    ...node,
  }))

  return (
    <div>
      {/* Индикатор времени последней генерации (для тестирования ISR) */}
      <IsrDebugIndicator
        pageId="homepage"
        serverGenerationTime={generationTime}
        showOnlyInDevelopment={true}
      />

      {page.pagecontent && (
        <Hero
          src={hero.heroImage.node.link}
          alt={hero.heroImage.node.altText || 'Альтернативный текст'}
          buttonText={hero.heroBtn}
          title={hero.heroText}
        />
      )}
      {page.content && (
        <div dangerouslySetInnerHTML={{ __html: wpToTailwind(page.content) }} />
      )}
      <CarouselBeyond />
      <PostsList posts={posts} />
      <CategoryPosts categoryName={categoryData.name} posts={categoryPosts} />
      <PostsByCategories posts={postsByCategories} />
      <CategoryLinks categories={categories} />
    </div>
  )
}

export default HomePage

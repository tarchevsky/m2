import { GET_CATEGORIES } from '@/graphql/queries/getCategories'
import { GET_CATEGORY } from '@/graphql/queries/getCategory'
import { GET_CATEGORY_BY_SLUG } from '@/graphql/queries/getCategoryBySlug'
import { GET_PAGE } from '@/graphql/queries/getPage'
import { GET_POSTS } from '@/graphql/queries/getPosts'
import { GET_POSTS_BY_CATEGORIES } from '@/graphql/queries/getPostsByCategories'
import { CategoriesData } from '@/graphql/types/categoriesTypes'
import { CategoryPostsData } from '@/graphql/types/categoryPostsTypes'
import { CategoryData } from '@/graphql/types/categoryTypes'
import { PageData } from '@/graphql/types/pageTypes'
import { PostsData } from '@/graphql/types/postTypes'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export async function fetchHomePageData(
  client: ApolloClient<NormalizedCacheObject>,
  pageId?: string,
  categoryId?: string,
  featureCategoryIds?: string[],
  categoryIds?: string[],
  category?: string,
) {
  const [
    pageResult,
    postsResult,
    categoryResult,
    categoryPostsResult,
    categoriesResult,
  ] = await Promise.all([
    client.query<PageData>({
      query: GET_PAGE,
      variables: { id: pageId },
    }),
    client.query<PostsData>({
      query: GET_POSTS,
    }),
    client.query<CategoryData>({
      query: GET_CATEGORY,
      variables: { id: categoryId },
    }),
    client.query<CategoryPostsData>({
      query: GET_POSTS_BY_CATEGORIES,
      variables: { categoryIds: featureCategoryIds },
    }),
    client.query<CategoriesData>({
      query: GET_CATEGORIES,
      variables: { categoryIds: categoryIds },
    }),
  ])

  return {
    page: pageResult.data.page,
    pagecontent: pageResult.data.page.pagecontent,
    posts: postsResult.data,
    category: categoryResult.data.category,
    categoryPosts: categoryPostsResult.data.posts.edges || [],
    categories: categoriesResult.data.categories.edges || [],
  }
}

/**
 * Получение данных категории по слагу
 */
export async function fetchCategoryBySlug(
  client: ApolloClient<NormalizedCacheObject>,
  slug: string,
) {
  if (!slug) {
    return null
  }

  const { data } = await client.query({
    query: GET_CATEGORY_BY_SLUG,
    variables: { slug },
  })

  return data?.category || null
}

/**
 * Получение всех категорий для генерации статических путей
 */
export async function fetchAllCategories(
  client: ApolloClient<NormalizedCacheObject>,
) {
  const { data } = await client.query({
    query: GET_CATEGORIES,
  })

  return data.categories.edges || []
}

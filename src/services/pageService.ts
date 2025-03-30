import { GET_CATEGORIES } from '@/graphql/queries/getCategories'
import { GET_CATEGORY } from '@/graphql/queries/getCategory'
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
  pageId: string,
  categoryId: string,
  featureCategoryIds: string[],
  categoryIds: string[],
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
    posts: postsResult.data,
    category: categoryResult.data.category,
    categoryPosts: categoryPostsResult.data.posts.edges || [],
    categories: categoriesResult.data.categories.edges || [],
  }
}

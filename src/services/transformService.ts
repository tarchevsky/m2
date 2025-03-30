import {
  CategoriesData,
  CategoryLinkProps,
} from '@/graphql/types/categoriesTypes'
import { CategoryData, CategoryPostProps } from '@/graphql/types/categoryTypes'
import { PostProps, PostsData } from '@/graphql/types/postTypes'

export function transformPosts(postsData: PostsData): PostProps[] {
  return (
    postsData?.posts.edges.map(({ node }) => {
      const mainCategory = node.categories?.edges[0]?.node
      return {
        ...node,
        path: mainCategory
          ? `/${mainCategory.slug}/${node.slug}`
          : `/posts/${node.slug}`,
      }
    }) || []
  )
}

export function transformCategoryPosts(
  categoryData: CategoryData['category'],
): CategoryPostProps[] {
  return (
    categoryData?.posts.edges.map(({ node }) => ({
      ...node,
      path: `/${categoryData.slug}/${node.slug}`,
    })) || []
  )
}

export function transformPostsByCategories(
  categoryPostsData: PostsData['posts']['edges'],
): PostProps[] {
  return categoryPostsData.map(({ node }) => {
    const mainCategory = node.categories?.edges[0]?.node
    return {
      ...node,
      path: mainCategory
        ? `/${mainCategory.slug}/${node.slug}`
        : `/posts/${node.slug}`,
    }
  })
}

export function transformCategories(
  categoriesData: CategoriesData['categories']['edges'],
): CategoryLinkProps[] {
  return categoriesData.map(({ node }) => ({
    ...node,
  }))
}

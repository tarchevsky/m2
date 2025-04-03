import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import CategoryPosts from '@/components/categoryPosts/CategoryPosts'
import FadeIn from '@/components/fadeIn/FadeIn'
import { GET_CATEGORIES } from '@/graphql/queries/getCategories'
import { GET_CATEGORY_BY_SLUG } from '@/graphql/queries/getCategoryBySlug'
import { PageProps } from '@/graphql/types/commonTypes'
import { getApolloClient } from '@/lib/apollo-client'

export const revalidate = 3600 // Ревалидация каждый час (3600 секунд)

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = params
  if (!category) {
    return {
      title: 'Категория не найдена',
      description: 'Запрашиваемая категория не существует',
    }
  }

  const apolloClient = getApolloClient()

  const { data } = await apolloClient.query({
    query: GET_CATEGORY_BY_SLUG,
    variables: { slug: category },
  })

  const categoryData = data?.category

  if (!categoryData) {
    return {
      title: 'Категория не найдена',
      description: 'Запрашиваемая категория не существует',
    }
  }

  return {
    title: `${categoryData.name} | Ваш сайт`,
    description: `Просмотр публикаций в категории ${categoryData.name}`,
  }
}

const CategoryPage = async ({ params }: PageProps) => {
  const { category } = params
  if (!category) {
    notFound()
  }

  const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

  const { data } = await apolloClient.query({
    query: GET_CATEGORY_BY_SLUG,
    variables: { slug: category },
  })

  const categoryData = data?.category

  if (!categoryData) {
    notFound()
  }

  // Получаем посты из категории
  const categoryPosts = categoryData.posts.edges.map(({ node }: any) => ({
    ...node,
    path: `/${categoryData.slug}/${node.slug}`,
  }))

  return (
    <>
      <FadeIn className="cont ind">
        <h1>{categoryData.name}</h1>
      </FadeIn>
      <FadeIn className="cont">
        <CategoryPosts posts={categoryPosts} />
      </FadeIn>
    </>
  )
}

export default CategoryPage

// Генерация статических маршрутов
export async function generateStaticParams() {
  const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

  const { data } = await apolloClient.query({
    query: GET_CATEGORIES,
  })

  return data.categories.edges.map(({ node }: any) => ({
    category: node.slug,
  }))
}

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import CategoryPosts from '@/components/categoryPosts/CategoryPosts'
import FadeIn from '@/components/fadeIn/FadeIn'
import { PageProps } from '@/graphql/types/commonTypes'
import { getApolloClient } from '@/lib/apollo-client'
import { fetchAllCategories, fetchCategoryBySlug } from '@/services/pageService'
import { transformCategoryBySlugPosts } from '@/services/transformService'

export const revalidate = 3600 // Ревалидация каждый час (3600 секунд)

// Вспомогательная функция для получения клиента Apollo для каждого запроса
const getClient = () => getApolloClient()

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

  const apolloClient = getClient()
  const categoryData = await fetchCategoryBySlug(
    apolloClient,
    category as string,
  )

  if (!categoryData) {
    return {
      title: 'Категория не найдена',
      description: 'Запрашиваемая категория не существует',
    }
  }

  return {
    title: `${categoryData.seo.title}`,
    description: categoryData.seo.metaDesc
      ? `${categoryData.seo.metaDesc}`
      : `На этой странице размещена категория услуг ${categoryData.name}`,
  }
}

const CategoryPage = async ({ params }: PageProps) => {
  const { category } = params
  if (!category) {
    notFound()
  }

  const apolloClient = getClient()
  const categoryData = await fetchCategoryBySlug(
    apolloClient,
    category as string,
  )

  if (!categoryData) {
    notFound()
  }

  // Получаем и трансформируем посты из категории
  const categoryPosts = transformCategoryBySlugPosts(categoryData)

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
  const apolloClient = getClient()
  const categoriesData = await fetchAllCategories(apolloClient)

  return categoriesData.map(({ node }: any) => ({
    category: node.slug,
  }))
}

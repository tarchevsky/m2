import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import IsrDebugIndicator from '@/components/IsrDebugIndicator'
import { GET_CATEGORY_BY_SLUG } from '@/graphql/queries/getCategoryBySlug'
import { GET_POST_BY_SLUG } from '@/graphql/queries/getPostBySlug'
import { Post } from '@/graphql/types/postTypes'
import { getApolloClient } from '@/lib/apollo-client'
import { formatDate } from '@/utils/formatDate'

export const revalidate = 3600 // Ревалидация каждый час (3600 секунд)

interface CategoryPostPageProps {
  params: {
    category: string
    slug: string
  }
}

export async function generateMetadata({
  params,
}: CategoryPostPageProps): Promise<Metadata> {
  const { slug } = params
  const apolloClient = getApolloClient()

  const { data } = await apolloClient.query({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  })

  const post = data?.postBy

  if (!post) {
    return {
      title: 'Пост не найден',
      description: 'Запрашиваемый пост не существует',
    }
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.metaDesc || '',
  }
}

const CategoryPostPage = async ({ params }: CategoryPostPageProps) => {
  // Уникальный идентификатор для страницы поста
  const pageId = `post-${params.category}-${params.slug}`

  // Записываем серверное время генерации
  const generationTime = new Date().toISOString()

  const { slug, category } = params
  const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

  // Получаем данные поста
  const { data } = await apolloClient.query({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  })

  const post: Post | null = data?.postBy

  // Проверяем, существует ли пост
  if (!post) {
    notFound()
  }

  // Получаем имя категории из поста, если доступно
  const categoryName = post.categories?.edges[0]?.node?.name || category

  return (
    <div>
      {/* Индикатор времени последней генерации (для тестирования ISR) */}
      <IsrDebugIndicator
        pageId={pageId}
        serverGenerationTime={generationTime}
      />

      <div className="cont mb-8">
        <main>
          {post.featuredImage ? (
            <>
              <img
                src={post.featuredImage.node.link}
                alt={post.featuredImage.node.altText}
                className="h-[90svh] w-full object-cover brightness-50"
              />
              <div>
                <h1 className="text-3xl">{post.title}</h1>
                <div>
                  Дата: <span>{formatDate(post.date)}</span>
                </div>
                <div>
                  Рубрика: <Link href={`/${category}`}>{categoryName}</Link>
                </div>
              </div>
              <Link href={`/${category}`}>&lt; Назад к {categoryName}</Link>
            </>
          ) : (
            <>
              <div className="flex flex-col">
                <h1 className="text-3xl">{post.title}</h1>
                <div>
                  Дата: <span>{formatDate(post.date)}</span>
                </div>
                <div>
                  Рубрика: <Link href={`/${category}`}>{categoryName}</Link>
                </div>
              </div>
              <Link href={`/${category}`}>&lt; Назад к {categoryName}</Link>
            </>
          )}
        </main>
      </div>
      <div className="px-[16px]">
        <section className="prose m-auto">
          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </section>
      </div>
    </div>
  )
}

export default CategoryPostPage

// Генерация статических путей
export async function generateStaticParams() {
  const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

  // Получаем все категории
  const { data: categoriesData } = await apolloClient.query({
    query: GET_CATEGORY_BY_SLUG,
    variables: { slug: 'all-categories' }, // Нужна отдельная query для получения всех категорий
  })

  const paths: Array<{ category: string; slug: string }> = []

  // Для каждой категории собираем пути к постам
  if (categoriesData?.categories?.edges) {
    for (const categoryEdge of categoriesData.categories.edges) {
      const category = categoryEdge.node
      const { data } = await apolloClient.query({
        query: GET_CATEGORY_BY_SLUG,
        variables: { slug: category.slug },
      })

      if (data?.category?.posts?.edges) {
        for (const postEdge of data.category.posts.edges) {
          paths.push({
            category: category.slug,
            slug: postEdge.node.slug,
          })
        }
      }
    }
  }

  return paths
}

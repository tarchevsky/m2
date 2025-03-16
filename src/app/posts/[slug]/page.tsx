import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { GET_ALL_POST_SLUGS } from '@/graphql/queries/getAllPostSlugs'
import { GET_POST_BY_SLUG } from '@/graphql/queries/getPostBySlug'
import { PageProps } from '@/graphql/types/commonTypes'
import { Post, SiteSettings } from '@/graphql/types/postTypes'
import { getApolloClient } from '@/lib/apollo-client'

const PostPage = async ({ params }: PageProps) => {
  const { slug } = params
  const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

  // Выполнение запроса к GraphQL API
  const { data } = await apolloClient.query({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  })

  const post: Post | null = data?.postBy
  const site: SiteSettings = data?.generalSettings

  // Обработка случая, когда пост не найден
  if (!post) {
    notFound()
  }

  // Функция для форматирования даты
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Месяцы начинаются с 0
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  return (
    <div>
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
                <h1>{post.title}</h1>
                <div>
                  Дата: <span>{formatDate(post.date)}</span>
                </div>
                <div>
                  Рубрика: <span>Блог</span>
                </div>
              </div>
              <Link href="/">&lt; Назад</Link>
            </>
          ) : (
            <>
              <div className="flex flex-col">
                <h1>{post.title}</h1>
                <div>
                  Дата: <span>{formatDate(post.date)}</span>
                </div>
                <div>
                  Рубрика: <span>Блог</span>
                </div>
              </div>
              <Link href="/">&lt; Назад</Link>
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

export default PostPage

// Генерация статических маршрутов
export async function generateStaticParams() {
  const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

  const { data } = await apolloClient.query({
    query: GET_ALL_POST_SLUGS,
  })

  const slugs = data.posts.nodes.map((post: { slug: string }) => ({
    slug: post.slug,
  }))

  return slugs
}

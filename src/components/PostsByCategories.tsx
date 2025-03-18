import { CategoryPostsData } from '@/graphql/types/categoryPostsTypes'
import Image from 'next/image'
import Link from 'next/link'

interface PostsByCategoriesProps {
  posts: CategoryPostsData['posts']['edges']
  title?: string
}

export default function PostsByCategories({ posts }: PostsByCategoriesProps) {
  if (!posts || posts.length === 0) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Загрузка постов...</h2>
          <p>Посты по категориям временно недоступны.</p>
        </div>
      </section>
    )
  }

  // Разделяем посты по категориям
  const cosmetologyPosts = posts
    .filter(({ node: post }) =>
      post.categories.edges.some((cat) => cat.node.slug === 'dGVybTo1'),
    )
    .slice(0, 5)

  const barberPosts = posts
    .filter(({ node: post }) =>
      post.categories.edges.some((cat) => cat.node.slug === 'dGVybTo0'),
    )
    .slice(0, 5)

  const PostsList = ({
    posts,
    categoryName,
  }: {
    posts: CategoryPostsData['posts']['edges']
    categoryName: string
  }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{categoryName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(({ node: post }) => {
          const mainCategory = post.categories.edges[0]?.node
          const postPath = mainCategory
            ? `/${mainCategory.slug}/${post.slug}`
            : `/posts/${post.slug}`

          return (
            <Link
              href={postPath}
              key={post.id}
              className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {post.featuredImage?.node?.sourceUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <div
                  className="text-gray-600 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )

  return (
    <section className="container mx-auto px-4 py-12">
      <PostsList posts={cosmetologyPosts} categoryName="Косметология" />
      <PostsList posts={barberPosts} categoryName="Парикмахерская" />
    </section>
  )
}

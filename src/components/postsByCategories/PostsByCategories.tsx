import Link from 'next/link'

interface PostsByCategoriesProps {
  posts: PostsByCategoriesPost[]
  title?: string
}

interface PostsByCategoriesPost {
  id: string
  title?: string
  slug: string
  path: string
}

const PostsByCategories = ({
  posts,
  title = 'Посты избранных категорий',
}: PostsByCategoriesProps) => {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="cont py-8">
      <div className="mx-auto">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-lg shadow-sm p-4"
            >
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <Link
                href={post.path}
                className="inline-block mt-2 text-blue-600 hover:underline"
              >
                Читать далее
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PostsByCategories

import { CategoryPostProps } from '@/graphql/types/categoryTypes'
import Link from 'next/link'
import React from 'react'

interface CategoryPostsProps {
  categoryName: string
  posts: CategoryPostProps[]
}

const CategoryPosts: React.FC<CategoryPostsProps> = ({
  categoryName,
  posts,
}) => {
  if (posts.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{categoryName}</h2>
        <p>В этой категории пока нет постов</p>
      </div>
    )
  }

  return (
    <div className="cont ind">
      {categoryName ? <h2>{categoryName}</h2> : null}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <div className="p-4">
              <Link href={post.path}>
                <h3
                  className="text-xl font-semibold mb-2 hover:text-blue-600"
                  dangerouslySetInnerHTML={{
                    __html: post.title,
                  }}
                />
                {post.excerpt && (
                  <div
                    className="text-gray-700 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt,
                    }}
                  />
                )}
              </Link>
              <Link href={post.path} className="text-blue-600 hover:underline">
                Читать статью
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryPosts

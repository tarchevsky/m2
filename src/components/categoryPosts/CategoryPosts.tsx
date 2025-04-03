import { CategoryPostProps } from '@/graphql/types/categoryTypes'
import Link from 'next/link'
import React from 'react'

interface CategoryPostsProps {
  categoryName?: string
  posts: CategoryPostProps[]
}

const CategoryPosts: React.FC<CategoryPostsProps> = ({
  categoryName,
  posts,
}) => {
  if (posts.length === 0) {
    return (
      <div className="ind">
        {categoryName ? <h2>{categoryName}</h2> : null}
        <p>В этой категории пока нет постов</p>
      </div>
    )
  }

  return (
    <div className="ind">
      {categoryName ? <h2>{categoryName}</h2> : null}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <li key={post.slug} className="border rounded-box shadow-md">
            <div className="p-4">
              <Link href={post.path}>
                <h3
                  dangerouslySetInnerHTML={{
                    __html: post.title,
                  }}
                />
                {post.excerpt && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt,
                    }}
                  />
                )}
              </Link>
              <Link className="link" href={post.path}>
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

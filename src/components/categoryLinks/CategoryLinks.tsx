import { CategoryLinkProps } from '@/graphql/types/categoriesTypes'
import Link from 'next/link'

interface CategoryLinksProps {
  categories: CategoryLinkProps[]
}

const CategoryLinks = ({ categories }: CategoryLinksProps) => {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="cont my-8">
      <h2 className="text-2xl font-bold mb-4">Категории</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/${category.slug}`}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryLinks

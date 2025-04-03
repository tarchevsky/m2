import FadeIn from '@/components/fadeIn/FadeIn'
import { CategoryLinkProps } from '@/graphql/types/categoriesTypes'
import Link from 'next/link'

interface TilesProps {
  tiles: CategoryLinkProps[]
}

const Tiles = ({ tiles }: TilesProps) => {
  if (!tiles || tiles.length === 0) {
    return null
  }

  return (
    <FadeIn className="cont ind my-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tiles.map((tile) => (
          <Link
            key={tile.id}
            href={`/${tile.slug}`}
            className="block p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow border border-gray-100 text-center"
          >
            <span className="text-lg font-medium text-gray-800">
              {tile.name}
            </span>
          </Link>
        ))}
      </div>
    </FadeIn>
  )
}

export default Tiles

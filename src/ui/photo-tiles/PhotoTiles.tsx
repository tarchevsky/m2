import FadeIn from '@/components/fadeIn/FadeIn'
import { CategoryLinkProps } from '@/graphql/types/categoriesTypes'
import Image from 'next/image'
import Link from 'next/link'

/**
 * Интерфейс для данных изображений, которые приходят из файла photoTiles.data.ts
 */
interface PhotoTileImageData {
  id: string
  src: string
  slug: string
}

/**
 * Интерфейс для параметров компонента PhotoTiles
 * tiles - массив категорий из API или другого источника
 * imageData - массив данных изображений из photoTiles.data.ts
 */
interface PhotoTilesComponentProps {
  tiles: CategoryLinkProps[]
  imageData: PhotoTileImageData[]
}

/**
 * Компонент PhotoTiles - отображает плитки категорий с изображениями
 * Сопоставляет категории и изображения по полю slug
 */
const PhotoTiles = ({ tiles, imageData }: PhotoTilesComponentProps) => {
  return (
    <FadeIn className="cont ind my-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tiles.map((tile) => {
          // Находим соответствующее изображение по слагу
          const matchingImage = imageData.find((img) => img.slug === tile.slug)
          const imageSrc = matchingImage
            ? matchingImage.src
            : '/placeholder-image.jpg'

          return (
            <Link
              key={tile.id}
              href={`/${tile.slug}`}
              className="relative block h-48 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative w-full h-full">
                {/* Фоновое изображение - используем изображение, соответствующее слагу */}
                <Image
                  src={imageSrc}
                  alt={tile.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Темный оверлей для лучшей читаемости текста */}
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity" />

                {/* Название категории */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <p className="text-xl text-base-100">{tile.name}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </FadeIn>
  )
}

export default PhotoTiles

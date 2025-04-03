import FadeIn from '@/components/fadeIn/FadeIn'
import Image from 'next/image'
import { CompaniesProps } from './types'

export const Companies = ({ companies }: CompaniesProps) => {
  return (
    <FadeIn className="cont ind flex gap-4 justify-between items-center flex-wrap">
      {companies.map((company) => (
        <div key={company.id}>
          <Image
            src={company.src}
            alt={company.alt}
            width={company.width}
            height={company.height}
          />
        </div>
      ))}
    </FadeIn>
  )
}

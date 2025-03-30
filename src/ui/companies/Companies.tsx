import Image from 'next/image'
import { CompaniesProps } from './types'

export const Companies = ({ companies }: CompaniesProps) => {
  return (
    <div className="cont ind flex gap-2 justify-between items-center">
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
    </div>
  )
}

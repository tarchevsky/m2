import { HeroProps } from '@/types'
import Image from 'next/image'

const Hero = ({ title, buttonText, src, alt }: HeroProps) => {
  return (
    <main className="hero md:min-h-[80vh]">
      <div className="hero-content flex-row gap-12 p-0">
        <Image
          className="md:w-[400px] rounded-box shadow-2xl"
          src={src}
          alt={alt || 'Картинка без описания'}
          priority
          width={600}
          height={600}
        />
        <div>
          {title ? (
            <h1
              className="md:text-6xl font-bold"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
          ) : (
            ''
          )}
          {buttonText ? (
            <button className="btn btn-primary btn-lg">{buttonText}</button>
          ) : (
            ''
          )}
        </div>
      </div>
    </main>
  )
}

export default Hero

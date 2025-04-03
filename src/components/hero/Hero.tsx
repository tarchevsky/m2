import { HeroProps } from '@/types'
import Image from 'next/image'

const Hero = ({ title, buttonText, src, alt }: HeroProps) => {
  return (
    <main className="hero ind md:min-h-[80vh]">
      <div className="relative hero-content cont md:cont-left md:pr-0 max-w-none w-full flex-col-reverse md:flex-row justify-between gap-24 p-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:top-auto md:left-auto md:-translate-x-0 md:-translate-y-0 md:grid md:grid-rows-2 md:gap-6 z-10">
          {title ? (
            <h1
              className="text-center md:text-left text-base-100 md:text-base-content"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
          ) : (
            ''
          )}
          {buttonText ? (
            <button className="btn btn-primary btn-lg btn-wide">
              {buttonText}
            </button>
          ) : (
            ''
          )}
        </div>
        <Image
          className="w-full md:w-[800px] rounded-box shadow-2xl brightness-[0.7]"
          src={src}
          alt={alt || 'Картинка без описания'}
          priority
          width={600}
          height={600}
        />
      </div>
    </main>
  )
}

export default Hero

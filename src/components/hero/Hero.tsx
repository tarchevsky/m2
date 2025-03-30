import { HeroProps } from '@/types'
import Image from 'next/image'

const Hero = ({ title, buttonText, src, alt }: HeroProps) => {
  return (
    <main className="hero ind md:min-h-[80vh]">
      <div className="hero-content cont md:cont-left md:pr-0 max-w-none w-full flex-col-reverse md:flex-row justify-between gap-24 p-0">
        <div className="grid grid-rows-2 gap-6">
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
            <button className="btn btn-primary btn-lg btn-wide">
              {buttonText}
            </button>
          ) : (
            ''
          )}
        </div>
        <Image
          className="w-full md:w-[800px] rounded-box shadow-2xl"
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

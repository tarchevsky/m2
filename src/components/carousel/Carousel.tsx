'use client'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '@/app/swiper.css'

import { Pagination, Navigation, EffectFade } from 'swiper/modules'
import styles from './Carousel.module.scss'
import cn from 'clsx'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'

const Carousel = () => {
	return (
		<Swiper
			slidesPerView={1}
			spaceBetween={30}
			loop={true}
			pagination={{
				clickable: true
			}}
			navigation={true}
			effect={'fade'}
			modules={[EffectFade, Pagination, Navigation]}
			className={cn(styles.carousel, 'carousel mb-8')}
		>
			<SwiperSlide>
				<div className='relative h-full flex flex-col items-center justify-center rounded-box'>
					<Image
						className='absolute top-0 left-0 h-full w-full rounded-box -z-10 brightness-50'
						src='/carousel/1.jpg'
						alt='more-dark'
						width={1000}
						height={1000}
						style={{
							objectFit: 'cover'
						}}
						quality={10}
					/>
					<div className='font-thin text-5xl text-white'>Title 1</div>
					<div className='text-white'>Текст на слайде</div>
				</div>
			</SwiperSlide>
			<SwiperSlide>
				<div className='relative h-full flex flex-col items-center justify-center rounded-box'>
					<Image
						className='absolute top-0 left-0 h-full w-full rounded-box -z-10 brightness-50'
						src='/carousel/2.jpg'
						alt='forest-river'
						width={1000}
						height={1000}
						style={{
							objectFit: 'cover'
						}}
						quality={10}
					/>
					<div className='font-thin text-5xl text-white'>Title 2</div>
					<div className='text-white'>Текст на слайде</div>
				</div>
			</SwiperSlide>
			<SwiperSlide>
				<div className='relative h-full flex flex-col items-center justify-center rounded-box'>
					<Image
						className='absolute top-0 left-0 h-full w-full rounded-box -z-10 brightness-50'
						src='/carousel/3.jpg'
						alt='fog-sea'
						width={1000}
						height={1000}
						style={{
							objectFit: 'cover'
						}}
						quality={10}
					/>
					<div className='font-thin text-5xl text-white'>Title 3</div>
					<div className='text-white'>Текст на слайде</div>
				</div>
			</SwiperSlide>
		</Swiper>
	)
}

export default Carousel

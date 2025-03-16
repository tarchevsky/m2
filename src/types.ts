import { Url } from 'next/dist/shared/lib/router/router'
import { ReactNode } from 'react'

// Metrika.tsx

export interface MetrikaProps {
	yId: string
}

// Meta.tsx

export interface MetaProps {
	title?: string
	metaDesc?: string
}

// Htag.tsx

export interface HtagProps {
	tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	children: string | ReactNode
	className?: string
}

// Button.tsx

export interface ButtonProps {
	tag: 'button' | 'link'
	type?: 'button' | 'submit'
	text: string
	ariaLabel: string
	href?: Url | string
	className?: string
	modalContent?: string | ReactNode
}

// Hero.tsx

export interface HeroProps {
	title?: string
	buttonText?: string
	src: string
	alt?: string
}

// page.tsx

export interface PageProps {
	posts: PostProps[]
	page: any
	node: any
	pageId: string
}

// [postSlug].tsx

export interface Params {
	postSlug: string
}

export type Site = {
	title: string
}

export interface PostEdge {
	node: {
		id: string
		title: string
		slug: string
		content: string
	}
}

export interface PostPageProps {
	post: PostProps
	site: Site
	path: string
	content: string
}

// index.tsx + [postSlug].tsx

export type PostProps = {
	slug: string
	title: string
	excerpt: string
	path: string
	content: string
	seo: {
		title: string
		metaDesc: string
	}
}

// Burger.tsx

export interface BurgerProps {
	toggleMenu: () => void
}

// ThemeToggle.tsx

export interface ThemeToggleProps {
	className?: string
}

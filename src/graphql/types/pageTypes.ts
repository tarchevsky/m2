import { PostsData } from '@/graphql/types/postTypes'

export interface Seo {
  metaDesc: string
  title: string
}

export interface Content {
  seo: Seo
  title: string
  content?: string
  pagecontent: {
    hero: {
      heroBtn?: string
      heroText?: string
      heroImage: {
        node: {
          altText: string
          link: string
        }
      }
    }
    address?: string
    email?: string
  }
}

export interface PageData {
  page: Content
}

export type CombinedData = PostsData & PageData

export interface PostNode {
  id: string
  title: string
  slug: string
  date: string
  excerpt: string
  categories: {
    edges: Array<{
      node: {
        slug: string
        name: string
      }
    }>
  }
  featuredImage?: {
    node: {
      sourceUrl: string
      altText?: string
    }
  }
}

export interface PostEdge {
  node: PostNode
}

export interface CategoryPostsData {
  posts: {
    edges: PostEdge[]
  }
}

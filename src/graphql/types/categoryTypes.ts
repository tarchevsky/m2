export interface CategoryPostNode {
  id: string
  slug: string
  title: string
  excerpt?: string
}

export interface CategoryPostProps extends CategoryPostNode {
  path: string
}

export interface CategoryProps {
  name: string
  slug: string
  posts: {
    edges: Array<{
      node: CategoryPostNode
    }>
  }
}
export interface CategoryData {
  category: CategoryProps
}

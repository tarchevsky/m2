export interface PageProps {
  params: {
    slug?: string
    [key: string]: string | undefined
  }
}

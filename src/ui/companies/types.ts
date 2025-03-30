export interface Company {
  id: string
  src: string
  alt: string
  width: number
  height: number
}

export interface CompaniesProps {
  companies: Company[]
}

import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Metadata } from 'next'

import Hero from '@/components/hero/Hero'
import { getApolloClient } from '@/lib/apollo-client'
import { fetchSeoMetadata } from '@/lib/seo'
import { fetchHomePageData } from '@/services/pageService'

import CarouselBeyond from '@/components/carouselBeyond/CarouselBeyond'
import CategoryLinks from '@/components/categoryLinks/CategoryLinks'
import CategoryPosts from '@/components/categoryPosts/CategoryPosts'
import PostsByCategories from '@/components/postsByCategories/PostsByCategories'
import PostsList from '@/components/postsList/PostsList'
import Tiles from '@/components/tiles/Tiles'
import {
  transformCategories,
  transformCategoryPosts,
  transformCompanies,
  transformPosts,
  transformPostsByCategories,
} from '@/services/transformService'
import { Companies } from '@/ui/companies/Companies'
import Tiles from '@/ui/tiles/Tiles'
import { wpToTailwind } from '@/utils/wpToTailwind'

export const revalidate = 3600 // Ревалидация каждый час (3600 секунд)

// ID константы
const PAGE_ID = 'cG9zdDo1Mw=='
const CATEGORY_ID = 'dGVybToz'
const FEATURE_CATEGORY_IDS = ['dGVybTo1', 'dGVybTo0']
const CATEGORY_IDS = ['dGVybTo1', 'dGVybTo0', 'dGVybToxMA==', 'dGVybTo5']

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchSeoMetadata(PAGE_ID)

  return {
    title: seo.title,
    description: seo.description,
  }
}

const HomePage = async () => {
  const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

  const {
    page,
    pagecontent,
    posts: postsData,
    category: categoryData,
    categoryPosts: categoryPostsData,
    categories: categoriesData,
  } = await fetchHomePageData(
    apolloClient,
    PAGE_ID,
    CATEGORY_ID,
    FEATURE_CATEGORY_IDS,
    CATEGORY_IDS,
  )

  const posts = transformPosts(postsData)
  const categoryPosts = transformCategoryPosts(categoryData)
  const postsByCategories = transformPostsByCategories(categoryPostsData)
  const categories = transformCategories(categoriesData)
  const companies = transformCompanies(pagecontent.companies)

  return (
    <div>
      {pagecontent.hero && (
        <Hero
          src={pagecontent.hero.heroImage.node.link}
          alt={
            pagecontent.hero.heroImage.node.altText || 'Альтернативный текст'
          }
          buttonText={pagecontent.hero.heroBtn}
          title={pagecontent.hero.heroText}
        />
      )}
      <Companies companies={companies} />
      <Tiles tiles={categories} />

      {page.content && (
        <div dangerouslySetInnerHTML={{ __html: wpToTailwind(page.content) }} />
      )}
      <CarouselBeyond />
      <PostsList posts={posts} />
      <CategoryPosts categoryName={categoryData.name} posts={categoryPosts} />
      <PostsByCategories posts={postsByCategories} />
      <CategoryLinks categories={categories} />
    </div>
  )
}

export default HomePage

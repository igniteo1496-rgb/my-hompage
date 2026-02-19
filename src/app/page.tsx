import {
  Hero,
  About,
  Experience,
  WritingPreview,
  ContactCTA,
} from '@/components/sections'
import { getAllPosts } from '@/lib/notion'

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  const posts = await getAllPosts()

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <WritingPreview posts={posts} />
      <ContactCTA />
    </>
  )
}

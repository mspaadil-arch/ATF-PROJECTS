import HeroSection from '@/components/sections/HeroSection'
import StatsSection from '@/components/sections/StatsSection'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import ServicesOverview from '@/components/sections/ServicesOverview'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTABanner from '@/components/sections/CTABanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProjects />
      <ServicesOverview />
      <TestimonialsSection />
      <CTABanner />
    </>
  )
}

import { HeroSection } from '@/components/sections/HeroSection'
import { TriageSection } from '@/components/sections/TriageSection'
import { NearbySection } from '@/components/sections/NearbySection'
import { TrustSection } from '@/components/sections/TrustSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TriageSection />
      <NearbySection />
      <TrustSection />
    </>
  )
}

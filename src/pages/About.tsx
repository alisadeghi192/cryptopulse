import  AboutHero  from '@/features/about/components/AboutHero'
import  MissionSection  from '@/features/about/components/MissionSection'
import  TechStackSection  from '@/features/about/components/TechStackSection'
import  DeveloperSection  from '@/features/about/components/DeveloperSection'
import  {AmbientLights}  from '@/components/ui/AmbientLights'
import ChallengesSection from '@/features/about/components/ChallengesSection'

export function About() {
  return (
    <main className="relative">
      <AmbientLights variant="about" intensity="subtle" />

      <div className="relative z-10">
     <AboutHero />
        <MissionSection />
        <TechStackSection />
        <ChallengesSection />
        <DeveloperSection />
      </div>
    </main>
  )
}



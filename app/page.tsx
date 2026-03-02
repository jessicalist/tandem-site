import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import ResearchSection from '@/components/ResearchSection'
import Publications from '@/components/Publications'
import ToolsAndNews from '@/components/ToolsAndNews'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Hero />
        <StatsBar />
        <ResearchSection />
        <Publications />
        <ToolsAndNews />
        <Contact />
      </div>
      <Footer />
    </>
  )
}

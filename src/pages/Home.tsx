import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import RecentWork from '../components/RecentWork'
import Experience from '../components/Experience'
import Certifications from '../components/Certifications'
import TechStackBanner from '../components/TechStackBanner'
// import TrustedBy from '../components/TrustedBy'  // kept for reference
import About from '../components/About'
import Footer from '../components/Footer'
import HeroBackground from '../components/HeroBackground'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroBackground />

      <Navbar />
      <Hero />
      <RecentWork />
      <Experience />
      <Certifications />
      <TechStackBanner />
      <About />

      <Footer />
    </div>
  )
}

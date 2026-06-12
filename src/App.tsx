import Navbar from './components/Navbar'
import Hero from './components/Hero'
import RecentWork from './components/RecentWork'
import TechStackBanner from './components/TechStackBanner'
// import TrustedBy from './components/TrustedBy'  // kept for reference
import Capabilities from './components/Capabilities'
import ModelEvals from './components/ModelEvals'
import About from './components/About'
import Footer from './components/Footer'
import HeroBackground from './components/HeroBackground'

export default function App() {
  return (
    <div className="min-h-screen">
      <HeroBackground />

      <Navbar />
      <Hero />
      <RecentWork />
      <TechStackBanner />
      <Capabilities />

      {/* Evals + About side-by-side (matches original layout) */}
      <section
        id="evals"
        className="max-w-7xl sm:px-6 sm:mt-20 border-t border-white/10 mt-16 mx-auto pt-10 px-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <ModelEvals />
          </div>
          <div id="about" className="lg:col-span-5">
            <About />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

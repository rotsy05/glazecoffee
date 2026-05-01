import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Menu from './components/Menu.jsx'
import News from './components/News.jsx'
import SocialProof from './components/SocialProof.jsx'
import Location from './components/Location.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen bg-white text-glaze-ink">
      <Navbar />
      <main className="relative">
        <Hero />
        <Marquee />
        <Menu />
        <News />
        <SocialProof />
        <Location />
      </main>
      <Footer />
    </div>
  )
}

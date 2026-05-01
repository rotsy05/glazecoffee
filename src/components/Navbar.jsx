import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

const links = [
  { label: 'Menu', href: '#menu' },
  { label: 'Actualités', href: '#news' },
  { label: 'Ils en parlent', href: '#social' },
  { label: 'Trouver le shop', href: '#location' },
]

const uberEatsUrl = 'https://www.ubereats.com/fr-en/store/glaze-coffee/q0nm6CFbXqCZvu17d1thOg?ps=1/'

export default function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(latest > 40)
    if (latest > previous && latest > 140) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Mobile menu backdrop — dim + blur the page so the drawer stays readable over any section */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            aria-hidden
            className="md:hidden fixed inset-0 z-40 bg-glaze-ink/55 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

    <motion.header
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-glaze-blue/95 backdrop-blur-md shadow-glaze'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-white font-display font-bold text-lg sm:text-xl tracking-tight"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/95 p-1.5 shadow-md">
            <img
              src="images/logo1.png"
              alt="Glaze Coffee logo"
              className="w-full h-full object-contain"
            />
          </span>
          GLAZE COFFEE
        </a>

        <ul className="hidden md:flex items-center gap-9">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-white/85 hover:text-white text-sm font-medium tracking-wide relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-glaze-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href={uberEatsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-glaze-gold text-glaze-blue font-semibold text-sm hover:bg-white transition-colors duration-300 shadow-pop"
          >
            Commander
            <span aria-hidden>→</span>
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 right-0 bg-glaze-blue-deep border-t border-white/10 shadow-glaze-lg"
          >
            <ul className="flex flex-col p-6 gap-5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-white text-2xl font-display font-semibold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={uberEatsUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-block mt-2 px-6 py-3 rounded-full bg-glaze-gold text-glaze-blue font-semibold"
                >
                  Commander →
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  )
}

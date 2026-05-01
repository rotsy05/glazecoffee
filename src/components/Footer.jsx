import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Footer() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <footer
      ref={ref}
      className="relative bg-glaze-blue-deep text-white overflow-hidden"
    >
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full bg-glaze-blue-light/20 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-[0.1] mix-blend-overlay pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center mb-8"
          >
            <img
              src="/images/logo2.png"
              alt="Glaze Coffee logo"
              className="w-28 sm:w-32 h-auto drop-shadow-2xl"
            />
          </motion.div>
          <h2 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.9]">
            GLAZE <span className="italic text-glaze-gold">COFFEE</span>
          </h2>
          <p className="mt-6 text-white/60 max-w-md mx-auto text-balance">
            Bagels, Donuts & Muffins.
          </p>

          <a
            href="https://instagram.com/glaze_coffee"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/15 hover:bg-white/10 transition-colors duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
            <span className="font-semibold">@glaze_coffee</span>
          </a>
        </motion.div>

        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a href="#menu" className="text-sm text-white/65 hover:text-white transition-colors">
              Menu
            </a>
            <a href="#news" className="text-sm text-white/65 hover:text-white transition-colors">
              Actualités
            </a>
            <a href="#location" className="text-sm text-white/65 hover:text-white transition-colors">
              Localisation
            </a>
            <a href="tel:+33243497051" className="text-sm text-white/65 hover:text-white transition-colors">
              02 43 49 70 51
            </a>
          </div>
          <div className="text-sm text-white/40">
            © {new Date().getFullYear()} Glaze Coffee · 26 Rue de la Paix, 53000 Laval
          </div>
        </div>
      </div>
    </footer>
  )
}

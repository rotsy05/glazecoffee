import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const hours = [
  { day: 'Lundi', label: '11h00 – 19h00', open: '11:00', close: '19:00' },
  { day: 'Mardi', label: '11h00 – 19h00', open: '11:00', close: '19:00' },
  { day: 'Mercredi', label: '11h00 – 19h00', open: '11:00', close: '19:00' },
  { day: 'Jeudi', label: '11h00 – 19h00', open: '11:00', close: '19:00' },
  { day: 'Vendredi', label: '11h00 – 20h00', open: '11:00', close: '20:00' },
  { day: 'Samedi', label: '11h00 – 20h00', open: '11:00', close: '20:00' },
  { day: 'Dimanche', label: '12h00 – 18h00', open: '12:00', close: '18:00' },
]

const SHOP_TIMEZONE = 'Europe/Paris'

function getParisNow() {
  const parts = new Intl.DateTimeFormat('fr-FR', {
    timeZone: SHOP_TIMEZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())

  const valueOf = (type) => parts.find((part) => part.type === type)?.value ?? ''
  const weekday = valueOf('weekday').toLowerCase().replace('.', '')
  const hour = Number(valueOf('hour'))
  const minute = Number(valueOf('minute'))
  const weekdayMap = {
    lun: 0,
    mar: 1,
    mer: 2,
    jeu: 3,
    ven: 4,
    sam: 5,
    dim: 6,
  }

  return {
    todayIndex: weekdayMap[weekday] ?? 0,
    currentMinutes: hour * 60 + minute,
  }
}

function toMinutes(time) {
  const [hour, minute] = time.split(':').map(Number)
  return hour * 60 + minute
}

function formatTime(time) {
  return time.replace(':', 'h')
}

function getCurrentOpeningState() {
  const { todayIndex, currentMinutes } = getParisNow()
  const todayHours = hours[todayIndex]
  const openMinutes = toMinutes(todayHours.open)
  const closeMinutes = toMinutes(todayHours.close)
  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes

  return {
    todayIndex,
    isOpen,
    statusText: isOpen ? 'OUVERT' : 'FERME',
    headline: isOpen ? `Ouvert jusqu'à ${formatTime(todayHours.close)}` : `Ouvre a ${formatTime(todayHours.open)}`,
  }
}

export default function Location() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  const [openingState, setOpeningState] = useState(() => getCurrentOpeningState())

  useEffect(() => {
    const updateOpeningState = () => {
      setOpeningState(getCurrentOpeningState())
    }

    updateOpeningState()

    const intervalId = window.setInterval(updateOpeningState, 60 * 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section
      id="location"
      ref={ref}
      className="relative py-24 sm:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <span className="text-glaze-blue font-semibold text-sm uppercase tracking-[0.2em]">
            Trouver le shop
          </span>
          <h2 className="mt-3 font-display font-bold text-4xl sm:text-6xl text-glaze-ink leading-[1] tracking-tight">
            On t'attend{' '}
            <span className="italic text-glaze-blue">à Laval</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 relative rounded-4xl overflow-hidden bg-glaze-blue text-white p-6 sm:p-10 min-h-[420px] flex flex-col justify-between shadow-glaze-lg"
          >
            {/* Static Google Map — pointer-events disabled so pan/zoom can't desync the custom pin */}
            <iframe
              title="Glaze Coffee — 26 Rue de la Paix, 53000 Laval"
              src="https://maps.google.com/maps?q=26%20Rue%20de%20la%20Paix%2C%2053000%20Laval&hl=fr&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full border-0 pointer-events-none"
            />

            {/* Click anywhere on the map → opens Google Maps in a new tab */}
            <a
              href="https://maps.app.goo.gl/NUDsGzB5bH5JuKEm7"
              target="_blank"
              rel="noreferrer"
              aria-label="Ouvrir Glaze Coffee dans Google Maps"
              className="absolute inset-0 z-[2] cursor-pointer"
            />

            {/* Brand tint — keeps the deep-blue aesthetic */}
            <div className="absolute inset-0 bg-glaze-blue/25 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-grain opacity-[0.08] mix-blend-overlay pointer-events-none" />

            {/* Top scrim — keeps the address eyebrow + h2 readable */}
            <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-glaze-blue-deep/85 via-glaze-blue-deep/40 to-transparent pointer-events-none" />
            {/* Bottom scrim — keeps the buttons readable */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-glaze-blue-deep/95 via-glaze-blue-deep/55 to-transparent pointer-events-none" />

            {/* Custom branded pin — map is static, so the pin tip stays aligned with the location */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-[31%] top-[29%] sm:left-[40%] sm:top-[33%] -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-none z-[6]"
            >
              {/* Label badge with little arrow */}
              <div className="relative bg-glaze-gold text-glaze-blue font-display font-bold px-4 py-2 rounded-2xl shadow-pop text-sm whitespace-nowrap tracking-wide">
                Glaze Coffee
                <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2.5 h-2.5 bg-glaze-gold rotate-45" />
              </div>

              {/* Connector line */}
              <div className="mt-2 w-px h-3 bg-glaze-gold/80" />

              {/* Pin badge with coffee icon + pulsing halo */}
              <div className="relative mt-1">
                <span className="absolute inset-0 rounded-full bg-glaze-gold/40 animate-ping" />
                <div className="relative w-10 h-10 rounded-full bg-glaze-gold ring-4 ring-white shadow-lg flex items-center justify-center text-glaze-blue">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M17 9h1a3 3 0 0 1 0 6h-1" />
                    <path d="M3 9h14v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9z" />
                    <line x1="7" y1="3" x2="7" y2="5" />
                    <line x1="11" y1="3" x2="11" y2="5" />
                    <line x1="15" y1="3" x2="15" y2="5" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <div className="relative z-10 pointer-events-none">
              <div className="text-xs uppercase tracking-[0.3em] text-glaze-gold mb-2">
                Adresse
              </div>
              <div className="font-display font-bold text-2xl sm:text-3xl leading-tight drop-shadow-lg">
                26 Rue de la Paix<br />
                53000 Laval, France
              </div>
            </div>

            <div className="relative z-10 mt-8 flex flex-wrap gap-3">
              <a
                href="https://maps.app.goo.gl/NUDsGzB5bH5JuKEm7"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-glaze-blue font-semibold text-sm hover:bg-glaze-gold transition-colors duration-300"
              >
                Itinéraire <span aria-hidden>→</span>
              </a>
              <a
                href="tel:+33243497051"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors duration-300"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                02 43 49 70 51
              </a>
            </div>
          </motion.div>

          {/* Hours card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 rounded-4xl bg-glaze-cream/50 p-6 sm:p-10 border border-glaze-blue/8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-glaze-blue font-semibold">
                  Horaires
                </div>
                <div className="font-display font-bold text-2xl sm:text-3xl text-glaze-ink mt-1">
                  {openingState.headline}
                </div>
              </div>
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${
                  openingState.isOpen
                    ? 'bg-green-100 text-green-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    openingState.isOpen ? 'bg-green-500 animate-pulse' : 'bg-rose-500'
                  }`}
                />
                {openingState.statusText}
              </div>
            </div>

            <ul className="divide-y divide-glaze-blue/10 mb-6">
              {hours.map((h, i) => (
                <li
                  key={h.day}
                  className={`flex items-center justify-between py-3 ${
                    i === openingState.todayIndex ? 'font-semibold text-glaze-blue' : 'text-glaze-ink/80'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {i === openingState.todayIndex && (
                      <span className="w-1.5 h-1.5 rounded-full bg-glaze-gold" />
                    )}
                    {h.day}
                  </span>
                  <span className="font-medium tabular-nums text-sm">
                    {h.label}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="https://www.ubereats.com/fr-en/store/glaze-coffee/q0nm6CFbXqCZvu17d1thOg?ps=1/"
              target="_blank"
              rel="noreferrer"
              className="mt-auto group relative inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-glaze-ink text-white font-semibold text-base hover:bg-glaze-blue transition-colors duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9V15H9V9H3ZM12 9C10.343 9 9 10.343 9 12C9 13.657 10.343 15 12 15H21V12C21 10.343 19.657 9 18 9H12Z" fill="currentColor"/>
                </svg>
                Commander sur Uber Eats
                <span aria-hidden>→</span>
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

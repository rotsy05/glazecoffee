import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const news = [
  {
    image: 'images/cinnamonbun.png',
    alt: 'Cinnamon Buns maison',
    tag: 'Petit nouveau',
    accent: 'gold',
    date: 'Cette semaine',
    title: 'Cinnamon Buns Maison',
    text: "Tout chauds, tout coulants. Le glaçage qui tient juste comme il faut. À tester avec un latte du jour.",
    span: 'lg:col-span-5',
  },
  {
    image: 'images/donuts.png',
    alt: 'Plateau de donuts Glaze',
    tag: 'En vitrine',
    accent: 'white',
    date: 'Tous les jours',
    title: 'Goutez nos donuts. Disponible en vitrine tous les jours !',
    text: 'Kinder, Oreo, Pistache, Spéculoos, M&Ms, Citron, Nutella, Kit Kat. Arrive tôt — ça part vite.',
    span: 'lg:col-span-7',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

function NewsCard({ item, index }) {
  const tagClasses =
    item.accent === 'gold'
      ? 'bg-glaze-gold text-glaze-blue'
      : 'bg-white/15 border border-white/25 text-white backdrop-blur-sm'

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className={`relative rounded-3xl overflow-hidden group cursor-pointer min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] ${item.span ?? ''}`}
    >
      <img
        src={item.image}
        alt={item.alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-glaze-blue-deep via-glaze-blue-deep/60 to-transparent" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />

      <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 text-white">
        <div className="flex items-center gap-3">
          <span className={`text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full ${tagClasses}`}>
            {item.tag}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">
            {item.date}
          </span>
        </div>

        <div className="max-w-md">
          <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight">
            {item.title}
          </h3>
          <p className="mt-2 text-sm sm:text-base text-white/80 leading-relaxed">
            {item.text}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-glaze-gold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            En savoir plus
            <span aria-hidden>→</span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function News() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section
      id="news"
      ref={ref}
      className="relative py-24 sm:py-32 bg-glaze-blue text-white overflow-hidden"
    >
      <div className="absolute -top-40 -right-40 w-[40rem] h-[40rem] rounded-full bg-glaze-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[36rem] h-[36rem] rounded-full bg-glaze-blue-light/30 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-[0.12] mix-blend-overlay pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-glaze-gold font-semibold text-sm uppercase tracking-[0.25em]">
              <span className="w-1.5 h-1.5 rounded-full bg-glaze-gold animate-pulse" />
              Actualités
            </span>
            <h2 className="mt-3 font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1] tracking-tight">
              Les nouvelles{' '}
              <span className="italic text-glaze-gold">sorties</span>.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-lg">
              Édition limitée, créations signature, événements du shop —
              tout ce qui bouge chez Glaze cette semaine.
            </p>
          </div>

          <a
            href="https://www.instagram.com/glaze_coffee/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/25 text-white text-sm font-medium hover:bg-white/10 transition-colors duration-300 self-start sm:self-auto whitespace-nowrap"
          >
            Suivre sur Instagram
            <span aria-hidden>→</span>
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6"
        >
          {news.map((item, i) => (
            <NewsCard key={item.title} item={item} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

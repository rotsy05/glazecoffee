import { motion } from 'framer-motion'

const items = [
  'Donuts Instagrammables',
  'Bagels Premium',
  'Café de Spécialité',
  '26 Rue de la Paix, Laval',
  '4.8/5 sur Google',
  'Ouvert dès 11h',
  'Recettes Signature',
]

function Row({ direction = 1 }) {
  return (
    <motion.div
      className="flex gap-8 sm:gap-12 whitespace-nowrap"
      animate={{ x: direction > 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
      transition={{ duration: 38, ease: 'linear', repeat: Infinity }}
    >
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-2 font-display font-semibold text-sm sm:text-base md:text-lg tracking-wide text-white/95"
        >
          {item}
          <span className="text-glaze-gold mx-1.5">·</span>
        </span>
      ))}
    </motion.div>
  )
}

export default function Marquee() {
  return (
    <section className="relative bg-glaze-blue text-white py-3 sm:py-4 overflow-hidden border-y border-white/10">
      <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-glaze-blue to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-glaze-blue to-transparent z-10 pointer-events-none" />
      <Row direction={1} />
    </section>
  )
}

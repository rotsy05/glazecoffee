import { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const reviews = [
  {
    name: 'Chloé J.',
    handle: '@chloej',
    text: "Adresse à tester absolument ! Tout est toujours délicieux, autant le salé que sucré et le service très agréable. Les produits sont qualitatifs et à la fois gourmand. Nous ne sommes jamais déçus !",
    rating: 5,
    avatar: '🧁',
  },
  {
    name: 'Manon L.',
    handle: '@manon.l',
    text: "Glaze Coffee à Laval, c'est vraiment le spot idéal pour une pause café bien méritée pendant la journée. Leur sélection de donuts, cookies et muffins est top, avec des saveurs qui changent régulièrement.",
    rating: 5,
    avatar: '🥯',
  },
  {
    name: 'Alexis G.',
    handle: '@alex',
    text: "Excellent accueil, excellent produits. Les bagel sont top et que dire des donuts… !",
    rating: 5,
    avatar: '☕',
  },
]

function AnimatedCounter({ value = 4.8, duration = 1.5, inView }) {
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 })
  const display = useTransform(spring, (v) => v.toFixed(1))

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

  return <motion.span>{display}</motion.span>
}

function ReviewCount({ value = 131, inView }) {
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1500, bounce: 0 })
  const display = useTransform(spring, (v) => Math.round(v))

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

  return <motion.span>{display}</motion.span>
}

export default function SocialProof() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="social"
      ref={ref}
      className="relative py-24 sm:py-32 bg-glaze-cream/40"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Rating block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <span className="text-glaze-blue font-semibold text-sm uppercase tracking-[0.2em]">
              Ils en parlent
            </span>
            <div className="mt-5 flex items-end gap-3 flex-wrap">
              <div className="font-display font-bold text-6xl sm:text-7xl lg:text-8xl text-glaze-blue leading-none">
                <AnimatedCounter value={4.8} inView={inView} />
              </div>
              <div className="pb-2 sm:pb-3 text-2xl sm:text-3xl text-glaze-gold tracking-tight">
                ★★★★★
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-glaze-blue/10 shadow-glaze">
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 via-red-500 to-yellow-400 flex items-center justify-center text-white font-bold text-sm">
                G
              </span>
              <span className="font-semibold text-glaze-ink">
                <ReviewCount value={131} inView={inView} /> avis Google
              </span>
            </div>

            <h2 className="mt-8 font-display font-bold text-4xl sm:text-5xl text-glaze-ink leading-[1] tracking-tight">
              Les Lavallois{' '}
              <span className="italic text-glaze-blue">adorent</span>.
            </h2>
            <p className="mt-4 text-lg text-glaze-ink/70 max-w-md">
              Un accueil qui fait sourire, des recettes qui rendent accro,
              et un spot qu'on quitte toujours en se disant qu'on reviendra.
            </p>
          </motion.div>

          {/* Reviews */}
          <div className="lg:col-span-7 grid gap-5">
            {reviews.map((r, i) => (
              <motion.div
                key={r.handle}
                initial={{ opacity: 0, rotateY: -15, y: 30 }}
                animate={inView ? { opacity: 1, rotateY: 0, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`relative bg-white rounded-3xl p-6 sm:p-7 border border-glaze-blue/8 shadow-glaze ${
                  i % 2 === 0 ? 'lg:ml-0 lg:mr-12' : 'lg:ml-12 lg:mr-0'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-glaze-blue/8 flex items-center justify-center text-2xl shrink-0">
                    {r.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold text-glaze-ink">
                          {r.name}
                        </div>
                        <div className="text-sm text-glaze-ink/50">
                          {r.handle}
                        </div>
                      </div>
                      <div className="text-glaze-gold text-sm">★★★★★</div>
                    </div>
                    <p className="mt-3 text-glaze-ink/80 leading-relaxed">
                      {r.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from 'framer-motion'

const headline = ['Bagels,', 'Donuts', '&', 'Muffins']

const wordVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i) => ({
    y: '0%',
    opacity: 1,
    transition: { delay: 0.15 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
}

function FloatingProduct({
  src,
  alt,
  className,
  delay = 0,
  size = 'w-32 h-32',
  rotate = true,
  direction = 1,
  rotateDuration = 24,
  yDuration = 6,
  yRange = 22,
}) {
  return (
    <motion.div
      className={`absolute select-none pointer-events-none ${size} ${className}`}
      initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1.2, delay, ease: 'easeOut' }}
    >
      <motion.div
        className="w-full h-full"
        animate={{
          y: [0, -yRange, 0],
          ...(rotate ? { rotate: direction > 0 ? [0, 360] : [0, -360] } : {}),
        }}
        transition={{
          y: { duration: yDuration, repeat: Infinity, ease: 'easeInOut' },
          ...(rotate
            ? { rotate: { duration: rotateDuration, repeat: Infinity, ease: 'linear' } }
            : {}),
        }}
        style={{ filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.3))' }}
      >
        <img src={src} alt={alt} className="w-full h-full object-contain" />
      </motion.div>
    </motion.div>
  )
}

function LeftFloaters({ scrollYProgress }) {
  const xScroll = useTransform(scrollYProgress, [0, 1], ['0vw', '-18vw'])

  return (
    <motion.div
      style={{ x: xScroll }}
      className="absolute inset-0 pointer-events-none z-[15] hidden sm:block"
    >
      <FloatingProduct
        src="/images/bagel.png"
        alt=""
        className="top-[14%] left-[3%] md:left-[5%]"
        size="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
        delay={0.4}
        direction={1}
        rotateDuration={28}
        yDuration={6}
        yRange={20}
      />
      <FloatingProduct
        src="/images/donutcookie.png"
        alt=""
        className="top-[45%] left-[1%] md:left-[13%]"
        size="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44"
        delay={0.65}
        direction={-1}
        rotateDuration={22}
        yDuration={7}
        yRange={26}
      />
      <FloatingProduct
        src="/images/muffin.png"
        alt=""
        className="bottom-[6%] left-[4%] md:left-[7%]"
        size="w-32 h-32 h-28 md:w-30 md:h-28 lg:w-32 lg:h-32"
        delay={0.9}
        direction={1}
        rotateDuration={32}
        yDuration={5.5}
        yRange={18}
      />
    </motion.div>
  )
}

function GobeletShowcase({ scrollYProgress }) {
  const xScroll = useTransform(scrollYProgress, [0, 1], ['0vw', '18vw'])

  return (
    <motion.div
      style={{ x: xScroll }}
      className="absolute right-0 sm:right-[0%] bottom-0 w-40 sm:w-64 md:w-72 lg:w-96 xl:w-[28rem] z-[30] pointer-events-none"
    >
      <motion.div
        initial={{ opacity: 0, x: 60, rotate: 8 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Static gold halo */}
        <div className="absolute inset-0 rounded-full bg-glaze-gold/40 blur-2xl" />

        <motion.img
          src="/images/gobeletplastique.png"
          alt="Gobelet plastique Glaze Coffee"
          initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.4))' }}
          className="relative w-full h-auto"
        />
      </motion.div>
    </motion.div>
  )
}

function MagneticButton({ children, href = '#menu' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 14 })
  const sy = useSpring(y, { stiffness: 200, damping: 14 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.35)
    y.set((e.clientY - cy) * 0.35)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className="relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-glaze-gold text-glaze-blue font-semibold text-base sm:text-lg shadow-pop overflow-hidden group"
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden
        className="relative z-10 inline-block"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        →
      </motion.span>
      <span className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
    </motion.a>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yShape1 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yShape2 = useTransform(scrollYProgress, [0, 1], [0, 80])
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[82vh] sm:min-h-[86vh] w-full overflow-hidden text-white pt-14 sm:pt-16"
    >
      <div className="absolute inset-0 gradient-blue" />

      {/* Geometric shapes */}
      <motion.div
        style={{ y: yShape1 }}
        className="absolute -top-20 -left-32 w-[28rem] h-[28rem] rounded-full bg-glaze-blue-light/18 blur-3xl"
      />
      <motion.div
        style={{ y: yShape2 }}
        className="absolute top-40 -right-32 w-[34rem] h-[34rem] rounded-full bg-glaze-gold/14 blur-3xl"
      />
      <div className="absolute inset-0 bg-grain opacity-[0.12] mix-blend-overlay pointer-events-none" />

      <LeftFloaters scrollYProgress={scrollYProgress} />

      <GobeletShowcase scrollYProgress={scrollYProgress} />

      <motion.div
        style={{ y: yText }}
        className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 pt-8 sm:pt-12 pb-12 sm:pb-16 flex flex-col items-center text-center"
      >
        <h1 className="font-display font-bold text-balance text-[2.6rem] sm:text-7xl md:text-8xl leading-[0.95] tracking-tight max-w-5xl">
          {headline.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom mr-3 sm:mr-5">
              <motion.span
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className={`inline-block ${
                  word === 'Donuts' ? 'text-glaze-gold italic' : ''
                }`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-8 max-w-xl text-base sm:text-lg text-white/75 leading-relaxed"
        >
          Préparés avec amour et passion pour satisfaire toutes vos envies gourmandes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#menu">Voir le menu</MagneticButton>
          <a
            href="#location"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/30 text-white font-medium text-sm sm:text-base hover:bg-white/10 transition-colors duration-300"
          >
            Trouver le shop
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-10 sm:mt-14 grid grid-cols-3 gap-6 sm:gap-12 max-w-2xl w-full"
        >
          {[
            { num: '4.8/5', label: 'Note Google' },
            { num: '10+', label: 'Bagels signature' },
            { num: '20+', label: 'Recettes gourmandes' },
          ].map((stat) => (
            <div key={stat.label} className="text-left sm:text-center">
              <div className="font-display font-bold text-3xl sm:text-4xl text-glaze-gold">
                {stat.num}
              </div>
              <div className="text-xs sm:text-sm text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/50"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}

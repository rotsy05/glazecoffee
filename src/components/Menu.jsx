import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const PLACEHOLDER = 'images/menu/_placeholder.svg'

const menuData = {
  bagels: {
    label: 'Bagels',
    image: 'images/bagel.png',
    imageAlt: 'Bagel signature Glaze Coffee',
    tagline: 'Frais. Généreux. Iconique.',
    blurb: '10 recettes signature préparées chaque matin avec des produits frais.',
    items: [
      { name: 'Thai', image: 'images/menu/bagels/Thai.png', tag: 'Édition limitée', desc: 'Cream cheese, noix de cajou grillée, effiloché de porc au barbecue, carottes, concombres, mesclun, sauce thaï.', price: '11,50€' },
      { name: 'BBQ Cheddar', image: 'images/menu/bagels/BBQ.png', tag: 'Original', desc: 'Cream cheese, oignons frits, bacon fumé, crème de cheddar, filet de poulet rôti, tomates, sauce barbecue, mesclun.', price: '11,50€' },
      { name: 'Caesar', image: 'images/menu/bagels/caesar.png', tag: 'Best-seller', desc: 'Cream cheese, oignons frits, copeaux de Parmigiano Reggiano AOP, filet de poulet rôti, sauce caesar, mesclun.', price: '11,00€' },
      { name: 'Chèvre-Miel', image: 'images/menu/bagels/ChevreMiel.png', tag: 'Sucré-salé', desc: 'Chèvre frais doux, miel, noix, jambon cru, tomates, roquette.', price: '11,00€' },
      { name: 'Indien', image: 'images/menu/bagels/indien.png', tag: 'Épicé', desc: 'Cream cheese, sauce curry, filet de poulet rôti, oignon rouge, tomates, mesclun.', price: '10,10€' },
      { name: 'Nordique', image: 'images/menu/bagels/Nordique.png', tag: 'Premium', desc: 'Cream cheese, saumon fumé, oignons rouges, avocat, mesclun.', price: '10,50€' },
      { name: 'New York', image: 'images/menu/bagels/NewYork.png', tag: 'Iconique', desc: 'Cream cheese, pastrami de boeuf, cornichons, oignons confits, sauce moutarde et miel, mesclun.', price: '10,50€' },
      { name: 'Parme', image: 'images/menu/bagels/Parme.png', tag: 'Italien', desc: 'Cream cheese, sauce pesto, jambon cru, tomates, mozzarella, roquette.\n', price: '10,50€' },
      { name: 'Veggie', image: 'images/menu/bagels/Veggie.png', tag: 'Veggie', desc: 'Houmous à la libanaise, oignon rouges, tomates, champignons frais, mesclun, crème de vinaigre balsamique.\n', price: '9,50€' },
      { name: 'Basique', image: 'images/menu/bagels/Basique.png', tag: 'Classique', desc: 'Cream cheese, saumon fumé.', price: '7,50€' },
      { name: 'Sur-Mesure', image: 'images/menu/bagels/surmes.png', tag: 'À toi !', desc: 'Compose ton bagel comme tu veux', price: 'dès 5,00€' },
    ],
  },
  donuts: {
    label: 'Donuts',
    image: 'images/donutcookie.png',
    imageAlt: 'Donut Cookie Glaze Coffee',
    tagline: 'Gourmands. Glacés. Instagrammables.',
    blurb: 'Des donuts  à tomber, fait pour le feed et pour la bouche.',
    items: [
        { name: 'Kinder Bueno',  image: 'images/menu/donuts/bueno.png', tag: 'Best-seller', desc: 'Glaçage crème de noisette, gaufrette Kinder Bueno, le tout fourré avec du délicieux Nutella.\n', price: '3,80€' },
        { name: 'Kinder Bueno',  image: 'images/menu/donuts/bueno.png', tag: 'Best-seller', desc: ' Glaçage crème de noisette, gaufrette Kinder Bueno.', price: '3,40€' },
      { name: 'Nutella', image: 'images/menu/donuts/nutella.png', tag: 'Classique', desc: 'Glaçage Nutella.', price: '3,40€' },
      { name: 'Pistache', image: 'images/menu/donuts/pistache.png', tag: 'Premium', desc: 'Glaçage pistache, morceaux de pistaches.', price: '3,40€' },
      { name: 'Spéculoos', image: 'images/menu/donuts/speculos.png',tag: 'Cosy', desc: 'Glaçage caramel, morceaux et coulis de Spéculoos.', price: '3,40€' },
      { name: 'Kit Kat', image: 'images/menu/donuts/kitkat.png',tag: 'Crunchy', desc: 'Glaçage crème bueno, éclats de Kit Kat croustillants, fourrage Nutella.', price: '3,80€' },
      { name: "M&M's", image: 'images/menu/donuts/mms.png',tag: 'Fun', desc: 'Glaçage chocolat, morceaux M&M\'s.',  price: '3,40€'},
      { name: 'Citron', image: 'images/menu/donuts/citron.png', tag: 'Frais', desc: 'Glaçage citron, éclats de meringue craquants et fourrage à la crème citronnée.', price: '3,80€' },
      { name: 'Oreo',  image: 'images/menu/donuts/oreo.png',tag: 'Iconique', desc: 'Glaçage vanille, morceaux de biscuits Oreo.', price: '3,40€' },
    ],
  },
  muffins: {
    label: 'Muffins',
    image: 'images/muffin.png',
    imageAlt: 'Muffin signature Glaze Coffee',
    tagline: 'Moelleux. Gourmand. Réconfortant.',
    blurb: 'Cuits chaque matin, à savourer encore tièdes avec un café de spécialité.',
    items: [
      {
        name: 'Caramel Beurre Salé & Pécan',
        image: 'images/menu/muffins/caramel.png',
        tag: 'Best-seller',
        desc: '\n' +
            'Base de muffin nature, noix de pécan torréfié, cœur fondant au caramel beurre salé.\n',
        price: '4,20€',
      },
      {
        name: 'Nutella',
        tag: 'Classique',
          image: 'images/menu/muffins/nutella.png',
        desc: 'Base de muffin nature, pépites de chocolat au lait, cœur fondant au Nutella',
        price: '4,20€',
      },
      {
        name: 'Praliné',
        tag: 'Maison',
          image: 'images/menu/muffins/praline.png',
        desc: 'Base de muffin nature, éclats de noisettes et d\'amandes caramélisées, cœur fondant au praliné.',
        price: '4,20€',
      },
    ],
  },
  formules: {
    label: 'Formules',
    image: 'images/menu/formule.png',
    imageAlt: 'Boisson signature Glaze Coffee',
    tagline: 'Le combo. Le bon plan.',
    blurb: 'Compose ton combo et fais des économies — les meilleurs deals de Laval.',
    items: [
      {
        name: 'Formule Malin',
        tag: 'Le bon plan',
          image: 'images/menu/formule.png',
        desc: 'Bagel + Dessert OU Boisson',
        price: '12,40€',
        highlight: true,
      },
      {
        name: 'Formule Complète',
        tag: 'Tout-en-un',
          image: 'images/menu/formule.png',
        desc: 'Bagel + Dessert + Boisson',
        price: '14,40€',
        highlight: true,
      },

      {
        name: 'Box de donuts',
        tag: 'Pause',
          image: 'images/menu/box.png',
        desc: 'Donuts et nombre de pièces au choix.',
        price: 'dès 11,80€',
      },
    ],
  },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

function MenuCard({ item }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`group relative rounded-3xl p-6 sm:p-7 border transition-shadow duration-500 flex flex-col h-full ${
        item.highlight
          ? 'bg-glaze-blue text-white border-glaze-blue shadow-glaze-lg'
          : 'bg-white text-glaze-ink border-glaze-blue/10 hover:shadow-glaze'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <div
          className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-1 ${
            item.highlight
              ? 'ring-glaze-gold/40 bg-glaze-gold/15'
              : 'ring-glaze-blue/30 bg-glaze-blue group-hover:bg-glaze-blue-light transition-colors'
          }`}
        >
          <img
            src={item.image ?? PLACEHOLDER}
            alt={item.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full ${
              item.image ? 'object-contain p-1.5' : 'object-cover'
            }`}
          />
        </div>
        {item.tag && (
          <span
            className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${
              item.highlight
                ? 'bg-glaze-gold text-glaze-blue'
                : 'bg-glaze-blue/8 text-glaze-blue'
            }`}
          >
            {item.tag}
          </span>
        )}
      </div>
      <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight line-clamp-2 min-h-[3.5rem]">
        {item.name}
      </h3>
      <p
        className={`mt-2 text-sm leading-relaxed line-clamp-4 min-h-[5.5rem] ${
          item.highlight ? 'text-white/75' : 'text-glaze-ink/65'
        }`}
      >
        {item.desc}
      </p>
      {item.price && (
        <div
          className={`mt-auto pt-5 border-t flex items-center justify-end ${
            item.highlight ? 'border-white/15' : 'border-glaze-blue/10'
          }`}
        >
          <span
            className={`font-display font-bold text-lg ${
              item.highlight ? 'text-glaze-gold' : 'text-glaze-blue'
            }`}
          >
            {item.price}
          </span>
        </div>
      )}
    </motion.div>
  )
}

export default function Menu() {
  const [active, setActive] = useState('bagels')
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const data = menuData[active]

  return (
    <section
      id="menu"
      ref={ref}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-glaze-cream/30"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <span className="text-glaze-blue font-semibold text-sm uppercase tracking-[0.2em]">
            Le Menu
          </span>
          <h2 className="mt-3 font-display font-bold text-4xl sm:text-6xl text-glaze-ink leading-[1] tracking-tight">
            Trois piliers,{' '}
            <span className="italic text-glaze-blue">une obsession</span>
          </h2>
          <p className="mt-5 text-lg text-glaze-ink/70 max-w-xl">
            Tout est fait maison, tout est pensé pour les gourmands.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {Object.entries(menuData).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`relative px-5 sm:px-7 py-3 rounded-full font-semibold text-sm sm:text-base transition-colors duration-300 ${
                active === key
                  ? 'text-white'
                  : 'text-glaze-ink/70 hover:text-glaze-blue bg-white border border-glaze-blue/15'
              }`}
            >
              {active === key && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute inset-0 bg-glaze-blue rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative inline-flex items-center">
                {val.label}
              </span>
            </button>
          ))}
        </div>

        {/* Tab spotlight banner */}
        <div className="relative mb-10 sm:mb-12 rounded-4xl overflow-hidden bg-glaze-blue text-white shadow-glaze-lg">
          <div className="absolute inset-0 gradient-blue opacity-95" />
          <div className="absolute inset-0 bg-grain opacity-[0.12] mix-blend-overlay pointer-events-none" />
          <div className="absolute -bottom-24 -right-20 w-[26rem] h-[26rem] rounded-full bg-glaze-gold/20 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 sm:grid-cols-5 items-center gap-6 p-7 sm:p-10 min-h-[220px]">
            <div className="sm:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`txt-${active}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-glaze-gold text-xs font-semibold uppercase tracking-[0.3em]">
                    {data.tagline}
                  </span>
                  <h3 className="mt-3 font-display font-bold text-3xl sm:text-4xl tracking-tight">
                    Notre sélection {data.label.toLowerCase()}
                  </h3>
                  <p className="mt-3 max-w-md text-white/75">{data.blurb}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="sm:col-span-2 relative h-44 sm:h-56 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`img-${active}`}
                  src={data.image}
                  alt={data.imageAlt}
                  initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.7, rotate: 10 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  style={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.45))' }}
                  className="max-h-full max-w-full object-contain"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {data.items.map((item) => (
                <MenuCard
                  key={item.name}
                  item={item}
                />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

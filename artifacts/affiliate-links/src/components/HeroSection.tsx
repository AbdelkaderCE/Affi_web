import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";

export function HeroSection() {
  const { content } = useContent();
  const hero = content.hero;

  if (!hero.visible) return null;

  return (
    <section className="w-full bg-[#ffffff] py-[80px] md:py-[100px] px-4 md:px-8 flex flex-col items-center text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto flex flex-col items-center"
      >
        <span className="text-[12px] font-semibold tracking-[0.15em] text-[#1d1d1f] opacity-50 mb-4 uppercase">
          {hero.overline}
        </span>
        <h1 className="text-[34px] sm:text-[40px] lg:text-[56px] font-semibold leading-[1.07] tracking-[-0.28px] text-[#1d1d1f] mb-6 max-w-2xl">
          {hero.headline}
        </h1>
        <p className="text-[28px] font-normal leading-[1.14] tracking-[0.196px] text-[#1d1d1f] mb-10 max-w-3xl">
          {hero.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <motion.a
            href={hero.primaryCtaLink}
            whileTap={{ scale: 0.95 }}
            className="bg-[#0066cc] text-white text-[18px] font-light leading-none rounded-full px-[22px] py-[11px] hover:bg-[#0071e3] transition-colors"
            data-testid="hero-browse-button"
          >
            {hero.primaryCtaLabel}
          </motion.a>
          <motion.a
            href={hero.secondaryCtaLink}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent text-[#0066cc] border border-[#0066cc] text-[18px] font-light leading-none rounded-full px-[22px] py-[11px] hover:bg-[#f5f5f7] transition-colors"
            data-testid="hero-about-button"
          >
            {hero.secondaryCtaLabel}
          </motion.a>
        </div>
      </motion.div>

      {hero.products.filter(p => p.visible).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {hero.products.filter(p => p.visible).map((item, i) => (
            <div key={item.id} className="bg-white rounded-[18px] border border-[#e0e0e0] p-6 flex flex-col items-center text-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full max-w-[200px] aspect-square object-contain rounded-lg mb-6 shadow-[rgba(0,0,0,0.22)_3px_5px_30px]"
                />
              ) : (
                <div className="w-[200px] h-[200px] rounded-lg mb-6 bg-[#f5f5f7]" />
              )}
              <span className="text-[12px] font-semibold text-[#7a7a7a] uppercase tracking-wider mb-2">{item.category}</span>
              <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-1">{item.name}</h3>
              <p className="text-[14px] text-[#7a7a7a] mb-4">{item.price}</p>
              <a
                href={item.affiliateLink}
                target={item.affiliateLink !== "#" ? "_blank" : undefined}
                rel={item.affiliateLink !== "#" ? "noopener noreferrer sponsored" : undefined}
                className="text-[14px] text-[#0066cc] hover:underline"
                data-testid={`hero-shop-link-${i}`}
              >
                Shop &rarr;
              </a>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

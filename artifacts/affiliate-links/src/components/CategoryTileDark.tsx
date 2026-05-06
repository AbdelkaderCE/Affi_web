import { motion } from "framer-motion";
import { AffiliateCard } from "./AffiliateCard";
import { CategorySection } from "@/context/ContentContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function CategoryTileDark({ section }: { section: CategorySection }) {
  const visibleProducts = section.products.filter(p => p.visible);
  if (!section.visible) return null;

  return (
    <section
      className="w-full py-[80px] px-4 md:px-8"
      style={{ backgroundColor: section.bgColor }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-[40px] font-semibold leading-[1.10] text-[#ffffff] mb-4">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-[28px] font-normal leading-[1.14] tracking-[0.196px] text-[#cccccc] max-w-2xl mx-auto">
              {section.subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {visibleProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <AffiliateCard
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                affiliateLink={product.affiliateLink}
                isDarkTile
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

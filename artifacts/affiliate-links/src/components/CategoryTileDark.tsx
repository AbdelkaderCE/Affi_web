import { motion } from "framer-motion";
import { AffiliateCard } from "./AffiliateCard";

interface Product {
  name: string;
  description: string;
  price: string;
  image: string;
}

interface CategoryTileDarkProps {
  title: string;
  subtitle?: string;
  products: Product[];
  bgColor?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function CategoryTileDark({ 
  title, 
  subtitle, 
  products, 
  bgColor = "#272729" 
}: CategoryTileDarkProps) {
  return (
    <section 
      className="w-full py-[80px] px-4 md:px-8"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-[40px] font-semibold leading-[1.10] text-[#ffffff] mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[28px] font-normal leading-[1.14] tracking-[0.196px] text-[#cccccc] max-w-2xl mx-auto">
              {subtitle}
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
          {products.map((product, i) => (
            <motion.div key={i} variants={itemVariants}>
              <AffiliateCard {...product} isDarkTile={true} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

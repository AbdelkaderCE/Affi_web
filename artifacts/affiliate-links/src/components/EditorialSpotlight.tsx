import { motion } from "framer-motion";
import editorial1 from "@/assets/editorial-1.png";

export function EditorialSpotlight() {
  return (
    <section className="w-full bg-[#f5f5f7] py-[80px] px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full"
        >
          <img 
            src={editorial1} 
            alt="Editorial lifestyle shot" 
            className="w-full rounded-[18px] object-cover shadow-[rgba(0,0,0,0.1)_0_20px_40px]"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex flex-col items-start"
        >
          <div className="bg-[#0066cc] text-white text-[12px] font-semibold tracking-wide px-3 py-1 rounded-full mb-6">
            #1 Pick
          </div>
          <h2 className="text-[40px] font-semibold leading-[1.10] text-[#1d1d1f] mb-6">
            The one bag I take everywhere.
          </h2>
          <p className="text-[17px] font-normal leading-[1.47] tracking-[-0.374px] text-[#1d1d1f] mb-8 max-w-md">
            I've tested dozens of backpacks, and this is the only one that balances rugged durability with a clean, professional aesthetic perfectly. It holds my entire setup effortlessly.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="bg-[#0066cc] text-white text-[18px] font-light leading-none rounded-full px-[22px] py-[11px] hover:bg-[#0071e3] transition-colors"
              data-testid="editorial-read-button"
            >
              Read Review
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-[#0066cc] border border-[#0066cc] text-[18px] font-light leading-none rounded-full px-[22px] py-[11px] hover:bg-[#ffffff] transition-colors"
              data-testid="editorial-shop-button"
            >
              Shop Now
            </motion.button>
          </div>
          
          <p className="text-[12px] font-normal leading-none tracking-[-0.12px] text-[#7a7a7a]">
            Affiliate link — I earn a small commission at no cost to you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

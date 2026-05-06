import { motion } from "framer-motion";
import { CheckCircle2, HeartHandshake, ShieldCheck } from "lucide-react";

export function TrustSection() {
  return (
    <section className="w-full bg-[#ffffff] py-[80px] px-4 md:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[40px] font-semibold leading-[1.10] text-[#1d1d1f] mb-16"
        >
          Why these picks?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#f5f5f7] flex items-center justify-center mb-6 text-[#0066cc]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-[#1d1d1f] mb-3">
              Tested First
            </h3>
            <p className="text-[17px] font-normal leading-[1.47] tracking-[-0.374px] text-[#1d1d1f] max-w-[280px]">
              I only share products that I have personally used, integrated into my workflow, and loved.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#f5f5f7] flex items-center justify-center mb-6 text-[#0066cc]">
              <HeartHandshake className="w-8 h-8" />
            </div>
            <h3 className="text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-[#1d1d1f] mb-3">
              No Sponsored Posts
            </h3>
            <p className="text-[17px] font-normal leading-[1.47] tracking-[-0.374px] text-[#1d1d1f] max-w-[280px]">
              No brand pays me to be on this list. All opinions are entirely my own.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#f5f5f7] flex items-center justify-center mb-6 text-[#0066cc]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-[#1d1d1f] mb-3">
              Full Disclosure
            </h3>
            <p className="text-[17px] font-normal leading-[1.47] tracking-[-0.374px] text-[#1d1d1f] max-w-[280px]">
              If you buy through these links, I earn a small commission that supports my work.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

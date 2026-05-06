import { motion } from "framer-motion";
import { CheckCircle2, HeartHandshake, ShieldCheck } from "lucide-react";
import { TrustSectionData } from "@/context/ContentContext";

const ICONS = [CheckCircle2, HeartHandshake, ShieldCheck];

export function TrustSection({ section }: { section: TrustSectionData }) {
  if (!section.visible) return null;
  const visibleItems = section.items.filter(i => i.visible);

  return (
    <section className="w-full bg-[#ffffff] py-[80px] px-4 md:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[40px] font-semibold leading-[1.10] text-[#1d1d1f] mb-16"
        >
          {section.headline}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {visibleItems.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 1) * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#f5f5f7] flex items-center justify-center mb-6 text-[#0066cc]">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-[#1d1d1f] mb-3">
                  {item.title}
                </h3>
                <p className="text-[17px] font-normal leading-[1.47] tracking-[-0.374px] text-[#1d1d1f] max-w-[280px]">
                  {item.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

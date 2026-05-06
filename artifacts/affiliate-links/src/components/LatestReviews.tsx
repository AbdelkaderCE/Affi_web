import { motion } from "framer-motion";
import { ReviewsSection } from "@/context/ContentContext";

export function LatestReviews({ section }: { section: ReviewsSection }) {
  if (!section.visible) return null;
  const visibleItems = section.items.filter(i => i.visible);

  return (
    <section className="w-full bg-[#f5f5f7] py-[80px] px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[40px] font-semibold leading-[1.10] text-[#1d1d1f] mb-12 text-center"
        >
          {section.headline}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleItems.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="w-full aspect-[4/3] rounded-[18px] overflow-hidden mb-6 relative bg-[#e0e0e0]">
                {review.image && (
                  <img
                    src={review.image}
                    alt={review.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex items-start mb-3">
                <span className="border border-[#0066cc] text-[#0066cc] text-[12px] font-medium px-3 py-1 rounded-full">
                  {review.category}
                </span>
              </div>
              <h3 className="text-[17px] font-semibold leading-[1.24] tracking-[-0.374px] text-[#1d1d1f] mb-2">
                {review.title}
              </h3>
              <p className="text-[14px] font-normal leading-[1.43] tracking-[-0.224px] text-[#7a7a7a] mb-4">
                {review.excerpt}
              </p>
              <a
                href={review.link}
                target={review.link !== "#" ? "_blank" : undefined}
                rel={review.link !== "#" ? "noopener noreferrer" : undefined}
                className="text-[14px] text-[#0066cc] group-hover:underline mt-auto"
              >
                Read more &rarr;
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

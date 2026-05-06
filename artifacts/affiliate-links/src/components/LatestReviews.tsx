import { motion } from "framer-motion";
import review1 from "@/assets/review-1.png";

export function LatestReviews() {
  const reviews = [
    {
      image: review1,
      category: "Tech",
      title: "The Ultimate Desk Setup for 2025",
      excerpt: "Rebuilding my workspace around focus and ergonomics."
    },
    {
      image: review1, // reusing the image for layout demonstration
      category: "Audio",
      title: "Why I switched to these studio monitors",
      excerpt: "Finding the perfect balance of flat response and daily enjoyment."
    },
    {
      image: review1,
      category: "Travel",
      title: "Minimalist Packing: 7 Days in Tokyo",
      excerpt: "Everything I brought in a single 25L backpack."
    }
  ];

  return (
    <section className="w-full bg-[#f5f5f7] py-[80px] px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[40px] font-semibold leading-[1.10] text-[#1d1d1f] mb-12 text-center"
        >
          Fresh from the blog
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="w-full aspect-[4/3] rounded-[18px] overflow-hidden mb-6 relative">
                <img 
                  src={review.image} 
                  alt={review.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
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
              <a href="#" className="text-[14px] text-[#0066cc] group-hover:underline mt-auto">
                Read more &rarr;
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

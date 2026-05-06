import { motion } from "framer-motion";

interface AffiliateCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  isDarkTile?: boolean;
}

export function AffiliateCard({ name, description, price, image, isDarkTile = false }: AffiliateCardProps) {
  return (
    <div className="bg-[#ffffff] rounded-[18px] border border-[#e0e0e0] p-[24px] flex flex-col h-full hover:shadow-[rgba(0,0,0,0.05)_0_10px_20px] transition-shadow">
      <div className="mb-6 flex-shrink-0 flex justify-center">
        <img 
          src={image} 
          alt={name} 
          className="w-[200px] h-[200px] object-cover rounded-[8px] shadow-[rgba(0,0,0,0.22)_3px_5px_30px]"
        />
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="text-[17px] font-semibold leading-[1.24] tracking-[-0.374px] text-[#1d1d1f] mb-1">
          {name}
        </h3>
        <p className="text-[17px] font-normal leading-[1.47] tracking-[-0.374px] text-[#1d1d1f] mb-4 flex-1">
          {description}
        </p>
        <div className="mt-auto pt-4 border-t border-[#e0e0e0] flex items-center justify-between">
          <span className="text-[17px] font-normal text-[#1d1d1f]">{price}</span>
          <a 
            href="#" 
            className={`text-[17px] font-normal ${isDarkTile ? 'text-[#2997ff]' : 'text-[#0066cc]'} hover:underline`}
            data-testid={`card-link-${name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            View on Amazon &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

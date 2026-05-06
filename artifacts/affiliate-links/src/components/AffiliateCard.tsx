interface AffiliateCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  affiliateLink?: string;
  isDarkTile?: boolean;
}

export function AffiliateCard({ name, description, price, image, affiliateLink = "#", isDarkTile = false }: AffiliateCardProps) {
  return (
    <div className="bg-[#ffffff] rounded-[18px] border border-[#e0e0e0] p-[24px] flex flex-col h-full">
      <div className="mb-6 flex-shrink-0 flex justify-center">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-[200px] h-[200px] object-cover rounded-[8px] shadow-[rgba(0,0,0,0.22)_3px_5px_30px]"
          />
        ) : (
          <div className="w-[200px] h-[200px] rounded-[8px] bg-[#f5f5f7] flex items-center justify-center text-[#cccccc] text-[13px]">
            No image
          </div>
        )}
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
            href={affiliateLink}
            target={affiliateLink !== "#" ? "_blank" : undefined}
            rel={affiliateLink !== "#" ? "noopener noreferrer sponsored" : undefined}
            className={`text-[17px] font-normal ${isDarkTile ? "text-[#2997ff]" : "text-[#0066cc]"} hover:underline`}
            data-testid={`card-link-${name.toLowerCase().replace(/\s+/g, "-")}`}
          >
            View on Amazon &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}

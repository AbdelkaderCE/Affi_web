export function SiteFooter() {
  return (
    <footer className="w-full bg-[#f5f5f7] pt-[64px] pb-[32px] px-4 md:px-8 border-t border-[#e0e0e0]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="flex flex-col gap-4">
            <h4 className="text-[14px] font-semibold text-[#1d1d1f]">Categories</h4>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">Tech</a>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">Home</a>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">Style</a>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">Fitness</a>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">Deals</a>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="text-[14px] font-semibold text-[#1d1d1f]">About</h4>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">My Story</a>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">How I Review</a>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">Disclosure Policy</a>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">Press</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[14px] font-semibold text-[#1d1d1f]">Connect</h4>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">Newsletter</a>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">Instagram</a>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">Twitter / X</a>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">YouTube</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-[14px] font-semibold text-[#1d1d1f]">Legal</h4>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">Affiliate Disclosure</a>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">Privacy Policy</a>
            <a href="#" className="text-[14px] text-[#333333] hover:text-[#0066cc] hover:underline transition-colors leading-[2.41]">Terms</a>
          </div>
        </div>

        <div className="pt-8 border-t border-[#e0e0e0]">
          <p className="text-[12px] font-normal leading-[1.0] tracking-[-0.12px] text-[#7a7a7a]">
            © 2025 curated. All affiliate links are clearly disclosed. Prices and availability subject to change.
          </p>
        </div>
      </div>
    </footer>
  );
}

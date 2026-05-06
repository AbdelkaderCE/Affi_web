import { useState } from "react";
import { X, ChevronUp, ChevronDown, Plus, Trash2, Copy, Eye, EyeOff, RotateCcw, ChevronRight, ChevronDown as Expand } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { useContent, uid, SiteContent, Product, CategorySection, EditorialSection, TrustSectionData, ReviewsSection, ReviewItem, TrustItem, HeroProduct } from "@/context/ContentContext";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold text-[#7a7a7a] uppercase tracking-[0.08em]">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      className="border border-[#e0e0e0] rounded-[8px] px-3 py-2 text-[13px] text-[#1d1d1f] w-full focus:outline-none focus:border-[#0066cc] transition-colors bg-white"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

function Textarea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <textarea
      className="border border-[#e0e0e0] rounded-[8px] px-3 py-2 text-[13px] text-[#1d1d1f] w-full focus:outline-none focus:border-[#0066cc] transition-colors bg-white resize-none"
      rows={3}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-2 text-[13px] font-medium transition-colors ${checked ? "text-[#0066cc]" : "text-[#7a7a7a]"}`}
      data-testid={`toggle-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {checked ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      {label}
    </button>
  );
}

function ReorderButtons({ onUp, onDown, disableUp, disableDown }: { onUp: () => void; onDown: () => void; disableUp: boolean; disableDown: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <button onClick={onUp} disabled={disableUp} className="p-0.5 rounded hover:bg-[#f5f5f7] disabled:opacity-30 transition-colors">
        <ChevronUp className="w-3.5 h-3.5 text-[#1d1d1f]" />
      </button>
      <button onClick={onDown} disabled={disableDown} className="p-0.5 rounded hover:bg-[#f5f5f7] disabled:opacity-30 transition-colors">
        <ChevronDown className="w-3.5 h-3.5 text-[#1d1d1f]" />
      </button>
    </div>
  );
}

function SectionHeader({ title, visible, onToggleVisible, expanded, onToggleExpanded }: {
  title: string; visible: boolean; onToggleVisible: () => void; expanded: boolean; onToggleExpanded: () => void;
}) {
  return (
    <div className="flex items-center gap-2 p-3 bg-[#f5f5f7] rounded-[10px]">
      <button onClick={onToggleExpanded} className="flex items-center gap-2 flex-1 text-left">
        {expanded ? <Expand className="w-4 h-4 text-[#7a7a7a]" /> : <ChevronRight className="w-4 h-4 text-[#7a7a7a]" />}
        <span className="text-[13px] font-semibold text-[#1d1d1f]">{title}</span>
      </button>
      <button
        onClick={onToggleVisible}
        className={`p-1 rounded transition-colors ${visible ? "text-[#0066cc]" : "text-[#cccccc]"}`}
        title={visible ? "Hide section" : "Show section"}
        data-testid={`section-visibility-${title}`}
      >
        {visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      </button>
    </div>
  );
}

function ProductEditor({ product, onChange, onRemove, onDuplicate, onMoveUp, onMoveDown, isFirst, isLast, isDark }: {
  product: Product;
  onChange: (p: Product) => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  isDark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-[10px] overflow-hidden ${product.visible ? "border-[#e0e0e0]" : "border-[#f0f0f0] opacity-60"}`}>
      <div className="flex items-center gap-2 px-3 py-2 bg-white">
        <ReorderButtons onUp={onMoveUp} onDown={onMoveDown} disableUp={isFirst} disableDown={isLast} />
        <button onClick={() => setOpen(o => !o)} className="flex-1 text-left text-[13px] font-medium text-[#1d1d1f] truncate">
          {product.name || "Untitled product"}
        </button>
        <button onClick={() => onChange({ ...product, visible: !product.visible })} className={`p-1 ${product.visible ? "text-[#0066cc]" : "text-[#cccccc]"}`} title="Toggle visibility">
          {product.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
        <button onClick={onDuplicate} className="p-1 text-[#7a7a7a] hover:text-[#1d1d1f]" title="Duplicate">
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button onClick={onRemove} className="p-1 text-[#7a7a7a] hover:text-red-500" title="Remove">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
      {open && (
        <div className="px-3 pb-3 flex flex-col gap-3 border-t border-[#f0f0f0] pt-3 bg-white">
          <Field label="Product Name">
            <Input value={product.name} onChange={v => onChange({ ...product, name: v })} placeholder="Product name" />
          </Field>
          <Field label="Description">
            <Input value={product.description} onChange={v => onChange({ ...product, description: v })} placeholder="Short description" />
          </Field>
          <Field label="Price">
            <Input value={product.price} onChange={v => onChange({ ...product, price: v })} placeholder="e.g. From $99" />
          </Field>
          <Field label="Affiliate Link">
            <Input value={product.affiliateLink} onChange={v => onChange({ ...product, affiliateLink: v })} placeholder="https://amazon.com/dp/..." />
          </Field>
          <Field label="Image URL">
            <Input value={product.image} onChange={v => onChange({ ...product, image: v })} placeholder="https://..." />
          </Field>
          {product.image && (
            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-[8px] border border-[#e0e0e0]" />
          )}
        </div>
      )}
    </div>
  );
}

function CategoryEditor({ section, onChange }: { section: CategorySection; onChange: (s: CategorySection) => void }) {
  const updateProduct = (i: number, p: Product) => {
    const products = [...section.products];
    products[i] = p;
    onChange({ ...section, products });
  };
  const removeProduct = (i: number) => {
    onChange({ ...section, products: section.products.filter((_, idx) => idx !== i) });
  };
  const duplicateProduct = (i: number) => {
    const p = { ...section.products[i], id: uid(), name: section.products[i].name + " (copy)" };
    const products = [...section.products];
    products.splice(i + 1, 0, p);
    onChange({ ...section, products });
  };
  const moveProduct = (i: number, dir: -1 | 1) => {
    const products = [...section.products];
    const j = i + dir;
    if (j < 0 || j >= products.length) return;
    [products[i], products[j]] = [products[j], products[i]];
    onChange({ ...section, products });
  };
  const addProduct = () => {
    onChange({
      ...section,
      products: [...section.products, { id: uid(), name: "New Product", description: "Description", price: "$0.00", image: "", affiliateLink: "#", visible: true }],
    });
  };

  return (
    <div className="flex flex-col gap-3 pt-2">
      <Field label="Section Title">
        <Input value={section.title} onChange={v => onChange({ ...section, title: v })} />
      </Field>
      <Field label="Subtitle">
        <Input value={section.subtitle} onChange={v => onChange({ ...section, subtitle: v })} placeholder="Optional tagline" />
      </Field>
      <Field label="Background Color">
        <div className="flex gap-2 items-center">
          <input type="color" value={section.bgColor} onChange={e => onChange({ ...section, bgColor: e.target.value })} className="w-8 h-8 rounded border border-[#e0e0e0] cursor-pointer" />
          <Input value={section.bgColor} onChange={v => onChange({ ...section, bgColor: v })} placeholder="#272729" />
        </div>
      </Field>
      <div className="border-t border-[#f0f0f0] pt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-[#7a7a7a] uppercase tracking-[0.08em]">Products ({section.products.length})</span>
          <button onClick={addProduct} className="flex items-center gap-1 text-[12px] text-[#0066cc] font-medium hover:underline" data-testid="add-product">
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {section.products.map((p, i) => (
            <ProductEditor
              key={p.id}
              product={p}
              onChange={np => updateProduct(i, np)}
              onRemove={() => removeProduct(i)}
              onDuplicate={() => duplicateProduct(i)}
              onMoveUp={() => moveProduct(i, -1)}
              onMoveDown={() => moveProduct(i, 1)}
              isFirst={i === 0}
              isLast={i === section.products.length - 1}
              isDark
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function EditorialEditor({ section, onChange }: { section: EditorialSection; onChange: (s: EditorialSection) => void }) {
  return (
    <div className="flex flex-col gap-3 pt-2">
      <Field label="Badge Text">
        <Input value={section.badge} onChange={v => onChange({ ...section, badge: v })} />
      </Field>
      <Field label="Headline">
        <Input value={section.headline} onChange={v => onChange({ ...section, headline: v })} />
      </Field>
      <Field label="Body Text">
        <Textarea value={section.body} onChange={v => onChange({ ...section, body: v })} />
      </Field>
      <Field label="Image URL">
        <Input value={section.image} onChange={v => onChange({ ...section, image: v })} placeholder="https://..." />
      </Field>
      {section.image && (
        <img src={section.image} alt="" className="w-full h-32 object-cover rounded-[8px] border border-[#e0e0e0]" />
      )}
      <div className="grid grid-cols-2 gap-2">
        <Field label="Primary CTA Label">
          <Input value={section.primaryCtaLabel} onChange={v => onChange({ ...section, primaryCtaLabel: v })} />
        </Field>
        <Field label="Primary CTA Link">
          <Input value={section.primaryCtaLink} onChange={v => onChange({ ...section, primaryCtaLink: v })} placeholder="https://..." />
        </Field>
        <Field label="Secondary CTA Label">
          <Input value={section.secondaryCtaLabel} onChange={v => onChange({ ...section, secondaryCtaLabel: v })} />
        </Field>
        <Field label="Secondary CTA Link">
          <Input value={section.secondaryCtaLink} onChange={v => onChange({ ...section, secondaryCtaLink: v })} placeholder="https://..." />
        </Field>
      </div>
      <Field label="Disclaimer">
        <Input value={section.disclaimer} onChange={v => onChange({ ...section, disclaimer: v })} />
      </Field>
    </div>
  );
}

function TrustEditor({ section, onChange }: { section: TrustSectionData; onChange: (s: TrustSectionData) => void }) {
  const updateItem = (i: number, item: TrustItem) => {
    const items = [...section.items];
    items[i] = item;
    onChange({ ...section, items });
  };
  return (
    <div className="flex flex-col gap-3 pt-2">
      <Field label="Headline">
        <Input value={section.headline} onChange={v => onChange({ ...section, headline: v })} />
      </Field>
      {section.items.map((item, i) => (
        <div key={item.id} className="border border-[#e0e0e0] rounded-[10px] p-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-semibold text-[#1d1d1f] flex-1">{item.title}</span>
            <button onClick={() => updateItem(i, { ...item, visible: !item.visible })} className={item.visible ? "text-[#0066cc]" : "text-[#cccccc]"}>
              {item.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
          </div>
          <Field label="Title">
            <Input value={item.title} onChange={v => updateItem(i, { ...item, title: v })} />
          </Field>
          <Field label="Body">
            <Textarea value={item.body} onChange={v => updateItem(i, { ...item, body: v })} />
          </Field>
        </div>
      ))}
    </div>
  );
}

function ReviewsEditor({ section, onChange }: { section: ReviewsSection; onChange: (s: ReviewsSection) => void }) {
  const updateItem = (i: number, item: ReviewItem) => {
    const items = [...section.items];
    items[i] = item;
    onChange({ ...section, items });
  };
  const removeItem = (i: number) => onChange({ ...section, items: section.items.filter((_, idx) => idx !== i) });
  const addItem = () => onChange({
    ...section,
    items: [...section.items, { id: uid(), image: "", category: "Tech", title: "New Review", excerpt: "Short excerpt.", link: "#", visible: true }],
  });
  const moveItem = (i: number, dir: -1 | 1) => {
    const items = [...section.items];
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    [items[i], items[j]] = [items[j], items[i]];
    onChange({ ...section, items });
  };

  return (
    <div className="flex flex-col gap-3 pt-2">
      <Field label="Headline">
        <Input value={section.headline} onChange={v => onChange({ ...section, headline: v })} />
      </Field>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[#7a7a7a] uppercase tracking-[0.08em]">Reviews ({section.items.length})</span>
        <button onClick={addItem} className="flex items-center gap-1 text-[12px] text-[#0066cc] font-medium hover:underline">
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>
      {section.items.map((item, i) => (
        <div key={item.id} className={`border rounded-[10px] p-3 flex flex-col gap-2 ${item.visible ? "border-[#e0e0e0]" : "border-[#f0f0f0] opacity-60"}`}>
          <div className="flex items-center gap-2">
            <ReorderButtons onUp={() => moveItem(i, -1)} onDown={() => moveItem(i, 1)} disableUp={i === 0} disableDown={i === section.items.length - 1} />
            <span className="flex-1 text-[12px] font-semibold text-[#1d1d1f] truncate">{item.title}</span>
            <button onClick={() => updateItem(i, { ...item, visible: !item.visible })} className={item.visible ? "text-[#0066cc]" : "text-[#cccccc]"}>
              {item.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
            <button onClick={() => removeItem(i)} className="text-[#7a7a7a] hover:text-red-500">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <Field label="Category"><Input value={item.category} onChange={v => updateItem(i, { ...item, category: v })} /></Field>
          <Field label="Title"><Input value={item.title} onChange={v => updateItem(i, { ...item, title: v })} /></Field>
          <Field label="Excerpt"><Input value={item.excerpt} onChange={v => updateItem(i, { ...item, excerpt: v })} /></Field>
          <Field label="Link"><Input value={item.link} onChange={v => updateItem(i, { ...item, link: v })} placeholder="https://..." /></Field>
          <Field label="Image URL"><Input value={item.image} onChange={v => updateItem(i, { ...item, image: v })} placeholder="https://..." /></Field>
        </div>
      ))}
    </div>
  );
}

function HeroEditor({ content, onChange }: { content: SiteContent; onChange: (c: SiteContent) => void }) {
  const hero = content.hero;
  const updateHeroProduct = (i: number, p: HeroProduct) => {
    const products = [...hero.products];
    products[i] = p;
    onChange({ ...content, hero: { ...hero, products } });
  };
  const removeHeroProduct = (i: number) => {
    onChange({ ...content, hero: { ...hero, products: hero.products.filter((_, idx) => idx !== i) } });
  };
  const addHeroProduct = () => {
    onChange({
      ...content,
      hero: {
        ...hero,
        products: [...hero.products, { id: uid(), name: "New Product", category: "Category", price: "From $0", image: "", affiliateLink: "#", visible: true }],
      },
    });
  };
  return (
    <div className="flex flex-col gap-3 pt-2">
      <Field label="Overline"><Input value={hero.overline} onChange={v => onChange({ ...content, hero: { ...hero, overline: v } })} /></Field>
      <Field label="Headline"><Input value={hero.headline} onChange={v => onChange({ ...content, hero: { ...hero, headline: v } })} /></Field>
      <Field label="Subtitle"><Textarea value={hero.subtitle} onChange={v => onChange({ ...content, hero: { ...hero, subtitle: v } })} /></Field>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Primary CTA Label"><Input value={hero.primaryCtaLabel} onChange={v => onChange({ ...content, hero: { ...hero, primaryCtaLabel: v } })} /></Field>
        <Field label="Primary CTA Link"><Input value={hero.primaryCtaLink} onChange={v => onChange({ ...content, hero: { ...hero, primaryCtaLink: v } })} /></Field>
        <Field label="Secondary CTA Label"><Input value={hero.secondaryCtaLabel} onChange={v => onChange({ ...content, hero: { ...hero, secondaryCtaLabel: v } })} /></Field>
        <Field label="Secondary CTA Link"><Input value={hero.secondaryCtaLink} onChange={v => onChange({ ...content, hero: { ...hero, secondaryCtaLink: v } })} /></Field>
      </div>
      <div className="border-t border-[#f0f0f0] pt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-[#7a7a7a] uppercase tracking-[0.08em]">Featured Products</span>
          <button onClick={addHeroProduct} className="flex items-center gap-1 text-[12px] text-[#0066cc] font-medium hover:underline">
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
        {hero.products.map((p, i) => (
          <div key={p.id} className={`border rounded-[10px] p-3 flex flex-col gap-2 mb-2 ${p.visible ? "border-[#e0e0e0]" : "border-[#f0f0f0] opacity-60"}`}>
            <div className="flex items-center gap-2">
              <span className="flex-1 text-[12px] font-semibold text-[#1d1d1f] truncate">{p.name}</span>
              <button onClick={() => updateHeroProduct(i, { ...p, visible: !p.visible })} className={p.visible ? "text-[#0066cc]" : "text-[#cccccc]"}>
                {p.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
              <button onClick={() => removeHeroProduct(i)} className="text-[#7a7a7a] hover:text-red-500">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <Field label="Name"><Input value={p.name} onChange={v => updateHeroProduct(i, { ...p, name: v })} /></Field>
            <Field label="Category"><Input value={p.category} onChange={v => updateHeroProduct(i, { ...p, category: v })} /></Field>
            <Field label="Price"><Input value={p.price} onChange={v => updateHeroProduct(i, { ...p, price: v })} /></Field>
            <Field label="Affiliate Link"><Input value={p.affiliateLink} onChange={v => updateHeroProduct(i, { ...p, affiliateLink: v })} placeholder="https://..." /></Field>
            <Field label="Image URL"><Input value={p.image} onChange={v => updateHeroProduct(i, { ...p, image: v })} placeholder="https://..." /></Field>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminPanel() {
  const { isAdminOpen, closeAdmin } = useAdmin();
  const { content, updateContent, resetContent } = useContent();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<"site" | "sections">("site");

  if (!isAdminOpen) return null;

  const toggleExpanded = (id: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const updateSection = (i: number, section: typeof content.sections[number]) => {
    const sections = [...content.sections];
    sections[i] = section;
    updateContent({ ...content, sections });
  };

  const moveSection = (i: number, dir: -1 | 1) => {
    const sections = [...content.sections];
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    [sections[i], sections[j]] = [sections[j], sections[i]];
    updateContent({ ...content, sections });
  };

  const toggleSectionVisible = (i: number) => {
    const sections = [...content.sections];
    sections[i] = { ...sections[i], visible: !sections[i].visible };
    updateContent({ ...content, sections });
  };

  const sectionLabel = (s: typeof content.sections[number]) => {
    if (s.type === "category") return s.title;
    if (s.type === "editorial") return "Editorial Spotlight";
    if (s.type === "trust") return "Why These Picks?";
    if (s.type === "reviews") return "Latest Reviews";
    return "Section";
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-[2px]" onClick={closeAdmin} />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-[380px] max-w-[95vw] z-[95] bg-white shadow-[rgba(0,0,0,0.18)_-4px_0_40px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f0f0] flex-shrink-0">
          <div>
            <h2 className="text-[15px] font-semibold text-[#1d1d1f]">Content Editor</h2>
            <p className="text-[12px] text-[#7a7a7a]">Changes save automatically</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { if (confirm("Reset all content to defaults?")) resetContent(); }}
              className="flex items-center gap-1 text-[12px] text-[#7a7a7a] hover:text-red-500 transition-colors"
              title="Reset to defaults"
              data-testid="admin-reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button onClick={closeAdmin} className="p-1.5 rounded-full hover:bg-[#f5f5f7] text-[#1d1d1f] transition-colors" data-testid="admin-close">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#f0f0f0] flex-shrink-0">
          {(["site", "sections"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-[13px] font-medium transition-colors capitalize ${activeTab === tab ? "text-[#0066cc] border-b-2 border-[#0066cc]" : "text-[#7a7a7a] hover:text-[#1d1d1f]"}`}
              data-testid={`admin-tab-${tab}`}
            >
              {tab === "site" ? "Site & Hero" : "Sections"}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "site" && (
            <div className="p-5 flex flex-col gap-4">
              {/* Site name */}
              <div className="flex flex-col gap-3">
                <h3 className="text-[12px] font-semibold text-[#7a7a7a] uppercase tracking-[0.08em]">Site Settings</h3>
                <Field label="Site Name">
                  <Input value={content.siteName} onChange={v => updateContent({ ...content, siteName: v })} />
                </Field>
              </div>

              {/* Hero */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-[12px] font-semibold text-[#7a7a7a] uppercase tracking-[0.08em] flex-1">Hero Section</h3>
                  <button
                    onClick={() => updateContent({ ...content, hero: { ...content.hero, visible: !content.hero.visible } })}
                    className={content.hero.visible ? "text-[#0066cc]" : "text-[#cccccc]"}
                  >
                    {content.hero.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                <HeroEditor content={content} onChange={updateContent} />
              </div>
            </div>
          )}

          {activeTab === "sections" && (
            <div className="p-5 flex flex-col gap-3">
              <p className="text-[12px] text-[#7a7a7a]">Drag sections to reorder. Click a section to edit its content.</p>
              {content.sections.map((section, i) => (
                <div key={section.id} className="flex flex-col gap-0">
                  <div className="flex items-center gap-2">
                    <ReorderButtons
                      onUp={() => moveSection(i, -1)}
                      onDown={() => moveSection(i, 1)}
                      disableUp={i === 0}
                      disableDown={i === content.sections.length - 1}
                    />
                    <div className="flex-1">
                      <SectionHeader
                        title={sectionLabel(section)}
                        visible={section.visible}
                        onToggleVisible={() => toggleSectionVisible(i)}
                        expanded={expandedSections.has(section.id)}
                        onToggleExpanded={() => toggleExpanded(section.id)}
                      />
                    </div>
                  </div>

                  {expandedSections.has(section.id) && (
                    <div className="ml-8 border-l-2 border-[#f0f0f0] pl-3 mt-2">
                      {section.type === "category" && (
                        <CategoryEditor section={section as CategorySection} onChange={s => updateSection(i, s)} />
                      )}
                      {section.type === "editorial" && (
                        <EditorialEditor section={section as EditorialSection} onChange={s => updateSection(i, s)} />
                      )}
                      {section.type === "trust" && (
                        <TrustEditor section={section as TrustSectionData} onChange={s => updateSection(i, s)} />
                      )}
                      {section.type === "reviews" && (
                        <ReviewsEditor section={section as ReviewsSection} onChange={s => updateSection(i, s)} />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

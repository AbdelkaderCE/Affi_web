import { Settings } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export function AdminToggle() {
  const { toggleAdmin } = useAdmin();
  return (
    <button
      onClick={toggleAdmin}
      data-testid="admin-toggle"
      aria-label="Open content editor"
      className="fixed bottom-6 right-6 z-[100] w-[52px] h-[52px] rounded-full bg-[#0066cc] text-white flex items-center justify-center shadow-[rgba(0,0,0,0.28)_0_8px_24px] hover:bg-[#0071e3] active:scale-95 transition-all"
    >
      <Settings className="w-5 h-5" />
    </button>
  );
}

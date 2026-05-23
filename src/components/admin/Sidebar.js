"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Layers, 
  TicketPercent, 
  Image as ImageIcon,
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Shield,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/adminfigaro/dashboard", icon: LayoutDashboard },
  { label: "Foods", href: "/adminfigaro/foods", icon: UtensilsCrossed },
  { label: "Categories", href: "/adminfigaro/categories", icon: Layers },
  { label: "Offers", href: "/adminfigaro/offers", icon: TicketPercent },
  { label: "Gallery", href: "/adminfigaro/gallery", icon: ImageIcon },
  { label: "Settings", href: "/adminfigaro/settings", icon: Settings },
  { label: "Security", href: "/adminfigaro/security", icon: Shield },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className={`lg:hidden fixed top-4 left-4 z-40 transition-opacity duration-200 ${isMobileOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white shadow-lg cursor-pointer touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Overlay for Mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside 
        className={`fixed top-0 left-0 h-screen bg-black border-r border-zinc-800 transition-[transform] duration-300 ease-in-out transform-gpu will-change-transform z-50 flex flex-col shadow-xl
          ${isCollapsed ? 'lg:w-20 w-72' : 'w-72'} 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">
          <Link href="/adminfigaro/dashboard" onClick={() => setIsMobileOpen(false)} className={`font-bold text-white transition-all overflow-hidden ${isCollapsed ? 'w-0' : 'w-auto'}`}>
            <span className="text-2xl tracking-tighter">FIGARO<span className="text-orange-500">.</span></span>
          </Link>
          <div className="flex items-center">
            {/* Desktop Toggle */}
            <button 
              onClick={toggleSidebar}
              className="hidden lg:flex p-2 hover:bg-zinc-900 rounded-lg text-zinc-500 transition-colors"
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            {/* Mobile Close */}
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-2 hover:bg-zinc-900 rounded-lg text-zinc-500 transition-colors cursor-pointer touch-manipulation min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 min-h-[48px] rounded-2xl transition-colors cursor-pointer touch-manipulation relative z-10 group
                  ${isActive 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                    : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}
                `}
              >
                <Icon size={22} className={`${isActive ? 'text-white' : 'group-hover:text-orange-500'} transition-colors`} />
                <span className={`font-medium whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0 lg:hidden' : 'opacity-100'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* User/Logout & Go To Website */}
        <div className="p-4 pb-32 lg:pb-4 border-t border-zinc-800 flex flex-col gap-2">
          <button
            onClick={() => {
              router.push("/");
              setIsMobileOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-orange-500/20 transition-all text-white font-medium cursor-pointer touch-manipulation relative z-10 min-h-[48px] ${
              isCollapsed ? 'w-12 justify-center' : 'w-full'
            }`}
          >
            <Globe size={18} className="shrink-0" />
            <span className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0 lg:hidden' : 'opacity-100'}`}>
              Go To Website
            </span>
          </button>

          <button
            onClick={async () => {
              await signOut({ redirect: false });
              router.push("/adminfigaro/login");
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-orange-500/20 transition-all text-white font-medium cursor-pointer touch-manipulation relative z-10 min-h-[48px] ${
              isCollapsed ? 'w-12 justify-center' : 'w-full'
            }`}
          >
            <LogOut size={18} className="shrink-0" />
            <span className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0 lg:hidden' : 'opacity-100'}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

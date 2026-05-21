"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import { Providers } from "@/components/admin/Providers";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  
  // Auth pages do not display sidebar layout
  const isAuthPage = 
    pathname === "/adminfigaro" || 
    pathname === "/adminfigaro/login";

  return (
    <Providers>
      {isAuthPage ? (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
          {children}
        </div>
      ) : (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex">
          <Sidebar />
          <main className="flex-1 lg:pl-72 pt-20 lg:pt-8 min-h-screen overflow-y-auto w-full">
            <div className="p-6 lg:px-12 lg:py-6 xl:px-16 w-full">
              {children}
            </div>
          </main>
        </div>
      )}
    </Providers>
  );
}

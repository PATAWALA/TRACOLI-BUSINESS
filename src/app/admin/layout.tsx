"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminBottomNav from "@/components/admin/AdminBottomNav";
import { supabase } from "@/lib/supabase/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && !pathname.startsWith("/admin/login")) {
        router.replace("/admin/login");
      } else {
        setAuthenticated(!!session);
      }
    });
  }, [pathname, router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (pathname.startsWith("/admin/login")) {
    return (
      <div className="fixed inset-0 z-[100] bg-white">
        <style>{`body > header, body > footer, body > nav.mobile-bottom-nav, body > .mobile-bottom-nav { display: none !important; }`}</style>
        {children}
      </div>
    );
  }

  if (authenticated === null) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
        <style>{`body > header, body > footer, body > nav.mobile-bottom-nav, body > .mobile-bottom-nav { display: none !important; }`}</style>
        <div className="size-8 animate-spin rounded-full border-[3px] border-ink-200 border-t-tracoli-500" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex bg-ink-50">
      <style>{`body > header, body > footer, body > nav.mobile-bottom-nav, body > .mobile-bottom-nav { display: none !important; }`}</style>

      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        onLogout={handleLogout}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader
          onMenuClick={() => setMobileOpen(true)}
          onToggleSidebar={() => setCollapsed(!collapsed)}
          sidebarCollapsed={collapsed}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto p-4 pb-20 lg:p-8 lg:pb-8">
          {children}
        </main>
      </div>

      <AdminBottomNav />
    </div>
  );
}

import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Toaster } from "sonner";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Contact";
import { EnrollPopup } from "./components/EnrollPopup";
import { Seo } from "./components/Seo";

export function Root() {
  const { pathname, hash } = useLocation();

  // Scroll to top on route change (unless an in-page anchor is targeted).
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f5efe4] text-[#3a2e22]">
      <Seo />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <EnrollPopup />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#3a2c1f",
            color: "#f3ead9",
            border: "1px solid rgba(201,163,106,0.4)",
          },
        }}
      />
    </div>
  );
}

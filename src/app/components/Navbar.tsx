import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const links: ({ label: string } & ({ anchor: string } | { route: string }))[] = [
    { label: t.nav.about, anchor: "#about" },
    { label: t.nav.performances, anchor: "#performances" },
    { label: t.nav.school, route: "/school" },
    { label: t.nav.recordings, anchor: "#recordings" },
    { label: t.nav.projects, anchor: "#projects" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onLightPage = location.pathname !== "/";
  const dark = scrolled || onLightPage;

  const goAnchor = (anchor: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + anchor);
    } else {
      document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goRoute = (route: string) => {
    setOpen(false);
    navigate(route);
  };

  const handle = (l: { anchor: string } | { route: string }) =>
    "anchor" in l ? goAnchor(l.anchor) : goRoute(l.route);

  const LangSwitch = ({ className = "" }: { className?: string }) => (
    <div className={`flex items-center gap-1 ${className}`}>
      {(["nl", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className={dark ? "text-[#6b4f37]/40" : "text-[#f3ead9]/40"}>/</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            className={`min-h-[44px] px-1 uppercase tracking-[0.1em] transition-colors ${
              lang === l
                ? dark
                  ? "text-[#6b4f37]"
                  : "text-[#f8f2e7]"
                : dark
                ? "text-[#6b4f37]/45 hover:text-[#6b4f37]"
                : "text-[#f3ead9]/50 hover:text-[#f8f2e7]"
            }`}
            style={{ fontSize: "0.82rem" }}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        dark
          ? "bg-[#f5efe4]/85 backdrop-blur-md border-b border-[#6b4f37]/15 shadow-[0_8px_30px_-20px_rgba(58,46,34,0.5)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <button
          onClick={() => goRoute("/")}
          className={`font-serif tracking-[0.18em] uppercase transition-colors ${
            dark ? "text-[#3a2e22]" : "text-[#f8f2e7]"
          }`}
          style={{ fontSize: "1.35rem", fontWeight: 500 }}
        >
          {t.name}
        </button>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => handle(l)}
              className={`group relative tracking-[0.06em] transition-colors ${
                dark ? "text-[#5a4733] hover:text-[#6b4f37]" : "text-[#f3ead9]/90 hover:text-white"
              }`}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#c9a36a] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <LangSwitch />
          <button
            onClick={() => goAnchor("#contact")}
            className={`rounded-full border px-6 py-2 tracking-[0.08em] transition-all duration-300 ${
              dark
                ? "border-[#6b4f37] text-[#6b4f37] hover:bg-[#6b4f37] hover:text-[#f8f2e7]"
                : "border-[#e8dcc4]/70 text-[#f8f2e7] hover:bg-[#f8f2e7] hover:text-[#3a2e22]"
            }`}
          >
            {t.nav.contact}
          </button>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <LangSwitch />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`-mr-2 flex h-11 w-11 items-center justify-center ${dark ? "text-[#3a2e22]" : "text-[#f8f2e7]"}`}
            aria-label={t.nav.menu}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden border-t border-[#6b4f37]/15 bg-[#f5efe4]/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {links.map((l) => (
                <button
                  key={l.label}
                  type="button"
                  onClick={() => handle(l)}
                  className="flex min-h-[48px] w-full items-center rounded-lg px-2 text-left tracking-[0.06em] text-[#5a4733] transition-colors active:bg-[#6b4f37]/10"
                >
                  {l.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goAnchor("#contact")}
                className="mt-2 flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#6b4f37] px-6 text-[#f8f2e7] transition-opacity active:opacity-80"
              >
                {t.nav.contact}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

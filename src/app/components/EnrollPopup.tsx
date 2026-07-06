import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import poster from "@/assets/school-ensemble.jpg";

const SEEN_KEY = "enroll-popup-seen";
const OPEN_DELAY = 2500;

export function EnrollPopup() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const p = t.enrollPopup;

  // Show once per browser session, a short moment after landing.
  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) return;
    const id = setTimeout(() => setOpen(true), OPEN_DELAY);
    return () => clearTimeout(id);
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(SEEN_KEY, "1");
  };

  const enroll = () => {
    close();
    navigate("/#contact");
  };

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1f160e]/70 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enroll-popup-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] bg-[#faf5ec] shadow-[0_40px_100px_-30px_rgba(31,22,14,0.7)]"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-[#1f160e]/35 text-[#f8f2e7] backdrop-blur-sm transition-colors hover:bg-[#1f160e]/55"
            >
              <X size={20} />
            </button>

            {/* Image header */}
            <div className="relative h-40 w-full sm:h-48">
              <ImageWithFallback
                src={poster}
                alt=""
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#faf5ec] via-transparent to-transparent" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[#c9a36a] px-3 py-1.5 text-[#2a1f15] shadow-sm" style={{ fontSize: "0.72rem", letterSpacing: "0.05em" }}>
                <Sparkles size={13} />
                {p.badge}
              </span>
            </div>

            {/* Body */}
            <div className="px-7 pb-8 pt-4 text-center">
              <p className="mb-3 tracking-[0.28em] uppercase text-[#a8814c]" style={{ fontSize: "0.72rem" }}>
                {p.eyebrow}
              </p>
              <h2
                id="enroll-popup-title"
                className="font-serif text-[#3a2e22]"
                style={{ fontSize: "clamp(1.65rem, 6vw, 2.1rem)", fontWeight: 500, lineHeight: 1.12 }}
              >
                {p.title1} <span className="italic text-[#8a6a3f]">{p.titleItalic}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-[#5a4733]" style={{ fontSize: "1.02rem", lineHeight: 1.65 }}>
                {p.text}
              </p>

              <button
                type="button"
                onClick={enroll}
                className="mt-7 flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#6b4f37] px-6 tracking-[0.06em] text-[#f8f2e7] shadow-[0_14px_30px_-12px_rgba(107,79,55,0.7)] transition-all duration-300 hover:bg-[#7c5c40] active:scale-[0.98]"
              >
                {p.cta}
              </button>
              <button
                type="button"
                onClick={close}
                className="mt-3 min-h-[44px] w-full py-2 tracking-[0.04em] text-[#8a7762] transition-colors hover:text-[#6b4f37]"
                style={{ fontSize: "0.92rem" }}
              >
                {p.dismiss}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

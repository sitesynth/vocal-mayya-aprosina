import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const POSTER =
  "https://images.unsplash.com/photo-1624367137873-b567facac335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";

// Replace with your own performance recording (.mp4 format).
const VIDEO_SRC =
  "https://cdn.coverr.co/videos/coverr-playing-the-piano-1572/1080p.mp4";

export function Hero() {
  const { t } = useLanguage();
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative h-[100svh] w-full overflow-hidden">
      {/* Full-section video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={POSTER}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Warm brown-beige overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1f15]/70 via-[#3a2e22]/45 to-[#2a1f15]/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(42,31,21,0.65)_100%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6 tracking-[0.45em] uppercase text-[#e3c89a]"
          style={{ fontSize: "0.8rem" }}
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-serif text-[#f8f2e7]"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)", fontWeight: 500, lineHeight: 1.05 }}
        >
          {t.hero.title1}
          <span className="block italic text-[#e3c89a]">{t.hero.title2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 max-w-2xl text-[#f3ead9]/85"
          style={{ fontSize: "1.2rem", lineHeight: 1.7 }}
        >
          {t.hero.text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <button
            onClick={() => scrollTo("#performances")}
            className="rounded-full bg-[#c9a36a] px-9 py-3.5 tracking-[0.08em] text-[#2a1f15] transition-all duration-300 hover:bg-[#dbb87f] hover:shadow-[0_15px_40px_-12px_rgba(201,163,106,0.6)]"
          >
            {t.hero.cta1}
          </button>
          <button
            onClick={() => scrollTo("#recordings")}
            className="rounded-full border border-[#e8dcc4]/60 px-9 py-3.5 tracking-[0.08em] text-[#f8f2e7] backdrop-blur-sm transition-all duration-300 hover:bg-[#f8f2e7]/10"
          >
            {t.hero.cta2}
          </button>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { repeat: Infinity, duration: 2.2 } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[#e3c89a]"
        aria-label={t.hero.scroll}
      >
        <ChevronDown size={34} strokeWidth={1.3} />
      </motion.button>
    </section>
  );
}

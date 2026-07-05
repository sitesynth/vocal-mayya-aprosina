import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";
import { useLanguage } from "../i18n/LanguageContext";
import { useSwipe } from "../hooks/useSwipe";
import slide1 from "@/assets/about-1.jpg";
import slide2 from "@/assets/about-2.png";
import slide3 from "@/assets/about-3.jpg";
import slide4 from "@/assets/about-4.png";
import slide5 from "@/assets/about-5.jpg";

const slides = [slide1, slide2, slide3, slide4, slide5];

// Per-slide crop focus. slide5 (choir finale) has Mayya on the far left, so on the
// narrow mobile crop we shift the focus left to keep her in frame; centered elsewhere.
const slidePos = [
  "object-center",
  "object-center",
  "object-center",
  "object-center",
  "object-[25%_center] sm:object-center",
];

export function About() {
  const { t } = useLanguage();
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlideIdx((p) => (p + 1) % slides.length), 4500);
    return () => clearInterval(id);
  }, []);

  const swipe = useSwipe(
    () => setSlideIdx((p) => (p + 1) % slides.length),
    () => setSlideIdx((p) => (p - 1 + slides.length) % slides.length),
  );

  return (
    <section id="about" className="relative bg-[#f5efe4] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left: text */}
          <Reveal>
            <p className="mb-4 tracking-[0.35em] uppercase text-[#a8814c]" style={{ fontSize: "0.78rem" }}>
              {t.about.eyebrow}
            </p>
            <h2
              className="font-serif text-[#3a2e22]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 500, lineHeight: 1.15 }}
            >
              {t.about.title1} <span className="italic text-[#8a6a3f]">{t.about.titleItalic}</span>
            </h2>
            <div className="mt-7 space-y-5 text-[#5a4733]" style={{ fontSize: "1.12rem", lineHeight: 1.8 }}>
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[#6b4f37]/15 pt-8">
              {t.about.stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 * i}>
                  <p className="font-serif text-[#8a6a3f]" style={{ fontSize: "2.4rem", fontWeight: 600, lineHeight: 1 }}>
                    {s.value}
                  </p>
                  <p className="mt-2 tracking-[0.05em] text-[#8a7762]" style={{ fontSize: "0.92rem" }}>
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          {/* Right: image */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -inset-3 rounded-[2rem] border border-[#c9a36a]/40" />
              <div
                {...swipe}
                className="relative h-[34rem] w-full touch-pan-y select-none overflow-hidden rounded-[1.8rem] bg-[#2a1f15] shadow-[0_40px_80px_-30px_rgba(58,46,34,0.6)]"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slideIdx}
                    src={slides[slideIdx]}
                    alt="Mayya Aprosina"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9 }}
                    className={`absolute inset-0 h-full w-full object-cover ${slidePos[slideIdx]}`}
                  />
                </AnimatePresence>
                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIdx(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === slideIdx ? "w-6 bg-[#f3ead9]" : "w-2 bg-[#f3ead9]/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute -bottom-7 -left-7 max-w-[15rem] rounded-2xl bg-[#fbf7ef] p-6 shadow-[0_25px_60px_-25px_rgba(58,46,34,0.55)]"
              >
                <p className="font-serif italic text-[#6b4f37]" style={{ fontSize: "1.15rem", lineHeight: 1.5 }}>
                  {t.about.quote}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

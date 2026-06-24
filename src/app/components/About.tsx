import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";

const portrait =
  "https://images.unsplash.com/photo-1699521376676-69aae178961b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

export function About() {
  const { t } = useLanguage();
  const stats = t.about.stats;
  return (
    <section id="about" className="relative bg-[#f5efe4] py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <Reveal className="order-2 lg:order-1">
          <p className="mb-4 tracking-[0.35em] uppercase text-[#a8814c]" style={{ fontSize: "0.78rem" }}>
            {t.about.eyebrow}
          </p>
          <h2
            className="font-serif text-[#3a2e22]"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 500, lineHeight: 1.15 }}
          >
            {t.about.title1} <span className="italic text-[#8a6a3f]">{t.about.titleItalic}</span>{" "}
            {t.about.title2}
          </h2>
          <div className="mt-7 space-y-5 text-[#5a4733]" style={{ fontSize: "1.12rem", lineHeight: 1.8 }}>
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[#6b4f37]/15 pt-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i}>
                <p
                  className="font-serif text-[#8a6a3f]"
                  style={{ fontSize: "2.4rem", fontWeight: 600, lineHeight: 1 }}
                >
                  {s.value}
                </p>
                <p className="mt-2 tracking-[0.05em] text-[#8a7762]" style={{ fontSize: "0.92rem" }}>
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <div className="relative order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[2rem] border border-[#c9a36a]/40" />
            <ImageWithFallback
              src={portrait}
              alt="Portrait of vocal teacher Mayya Aprosina on stage"
              className="relative h-[34rem] w-full rounded-[1.8rem] object-cover shadow-[0_40px_80px_-30px_rgba(58,46,34,0.6)]"
            />
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
    </section>
  );
}

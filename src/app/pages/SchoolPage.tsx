import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, Check, ArrowRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";

const heroImg =
  "https://images.unsplash.com/photo-1612016410921-264f6afed556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600";

function Faq({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#6b4f37]/15">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-6 py-6 text-left">
        <span className="font-serif text-[#3a2e22]" style={{ fontSize: "1.35rem", fontWeight: 500 }}>
          {q}
        </span>
        <span className="shrink-0 text-[#8a6a3f]">{isOpen ? <Minus size={22} /> : <Plus size={22} />}</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[#5a4733]" style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SchoolPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const s = t.school;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-[#f5efe4]">
      {/* Page hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <ImageWithFallback
          src={heroImg}
          alt="Pianist at an upright piano in warm light"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f15]/90 via-[#2a1f15]/45 to-[#2a1f15]/55" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-32 lg:px-10 lg:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mb-5 tracking-[0.4em] uppercase text-[#e3c89a]"
            style={{ fontSize: "0.8rem" }}
          >
            {s.heroEyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl font-serif text-[#f8f2e7]"
            style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 500, lineHeight: 1.05 }}
          >
            {s.heroTitle1} <span className="italic text-[#e3c89a]">{s.heroTitleItalic}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-6 max-w-xl text-[#f3ead9]/85"
            style={{ fontSize: "1.2rem", lineHeight: 1.7 }}
          >
            {s.heroText}
          </motion.p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:px-10">
          <Reveal className="lg:col-span-5">
            <p className="mb-4 tracking-[0.35em] uppercase text-[#a8814c]" style={{ fontSize: "0.78rem" }}>
              {s.approachEyebrow}
            </p>
            <h2 className="font-serif text-[#3a2e22]" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.15 }}>
              {s.approachTitle1} <span className="italic text-[#8a6a3f]">{s.approachTitleItalic}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="space-y-5 text-[#5a4733] lg:col-span-7">
            <p style={{ fontSize: "1.2rem", lineHeight: 1.85 }}>{s.approachP1}</p>
            <p style={{ fontSize: "1.2rem", lineHeight: 1.85 }}>{s.approachP2}</p>
          </Reveal>
        </div>
      </section>

      {/* Curriculum */}
      <section className="bg-[#efe6d6] py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal className="mb-16 text-center">
            <p className="mb-4 tracking-[0.35em] uppercase text-[#a8814c]" style={{ fontSize: "0.78rem" }}>
              {s.curriculumEyebrow}
            </p>
            <h2 className="font-serif text-[#3a2e22]" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 500, lineHeight: 1.15 }}>
              {s.curriculumTitle1} <span className="italic text-[#8a6a3f]">{s.curriculumTitleItalic}</span>
            </h2>
          </Reveal>

          <div>
            {s.curriculum.map((c, i) => (
              <motion.div
                key={c.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group flex items-baseline gap-6 border-b border-[#6b4f37]/15 py-7 sm:gap-10"
              >
                <span className="font-serif text-[#c9a36a]" style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                  {c.num}
                </span>
                <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
                  <h3 className="font-serif text-[#3a2e22] transition-colors group-hover:text-[#8a6a3f]" style={{ fontSize: "1.6rem", fontWeight: 500 }}>
                    {c.title}
                  </h3>
                  <p className="max-w-md text-[#6a5740]" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
                    {c.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — editorial price list */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <Reveal className="mb-16 text-center">
            <p className="mb-4 tracking-[0.35em] uppercase text-[#a8814c]" style={{ fontSize: "0.78rem" }}>
              {s.pricingEyebrow}
            </p>
            <h2 className="font-serif text-[#3a2e22]" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 500, lineHeight: 1.15 }}>
              {s.pricingTitle1} <span className="italic text-[#8a6a3f]">{s.pricingTitleItalic}</span> {s.pricingTitle2}
            </h2>
          </Reveal>

          <div className="space-y-10">
            {s.plans.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="grid gap-6 border-b border-[#6b4f37]/15 pb-10 md:grid-cols-12 md:items-center"
              >
                <div className="md:col-span-4">
                  <h3 className="font-serif text-[#3a2e22]" style={{ fontSize: "1.8rem", fontWeight: 500 }}>
                    {p.name}
                  </h3>
                  <p className="mt-1 text-[#8a7762]" style={{ fontSize: "0.98rem" }}>
                    {p.note}
                  </p>
                </div>
                <ul className="space-y-2 md:col-span-5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[#5a4733]" style={{ fontSize: "1.05rem" }}>
                      <Check size={17} className="mt-1 shrink-0 text-[#8a6a3f]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="md:col-span-3 md:text-right">
                  <p className="font-serif text-[#8a6a3f]" style={{ fontSize: "2.6rem", fontWeight: 600, lineHeight: 1 }}>
                    {p.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <Reveal className="mt-14 text-center">
            <button
              onClick={() => navigate("/#contact")}
              className="group inline-flex items-center gap-3 rounded-full bg-[#6b4f37] px-9 py-4 tracking-[0.08em] text-[#f8f2e7] transition-all duration-300 hover:bg-[#54402c] hover:shadow-[0_15px_40px_-12px_rgba(107,79,55,0.6)]"
            >
              {s.pricingCta}
              <ArrowRight size={19} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#efe6d6] py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal className="mb-12 text-center">
            <p className="mb-4 tracking-[0.35em] uppercase text-[#a8814c]" style={{ fontSize: "0.78rem" }}>
              {s.faqEyebrow}
            </p>
            <h2 className="font-serif text-[#3a2e22]" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 500, lineHeight: 1.15 }}>
              {s.faqTitle1} <span className="italic text-[#8a6a3f]">{s.faqTitleItalic}</span>
            </h2>
          </Reveal>
          <div>
            {s.faqs.map((f, i) => (
              <Faq
                key={f.q}
                q={f.q}
                a={f.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";

const img =
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1280";

export function SchoolTeaser() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-[#2c2118] py-28 text-[#f3ead9] lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12 lg:px-10">
        <Reveal className="lg:col-span-6">
          <p className="mb-4 tracking-[0.35em] uppercase text-[#e3c89a]" style={{ fontSize: "0.78rem" }}>
            {t.schoolTeaser.eyebrow}
          </p>
          <h2
            className="font-serif text-[#f8f2e7]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 500, lineHeight: 1.08 }}
          >
            {t.schoolTeaser.title1}
            <br />
            <span className="italic text-[#e3c89a]">{t.schoolTeaser.titleItalic}</span>
          </h2>
          <p className="mt-6 max-w-md text-[#e7dcc8]/80" style={{ fontSize: "1.15rem", lineHeight: 1.8 }}>
            {t.schoolTeaser.text}
          </p>

          <button
            onClick={() => navigate("/school")}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#c9a36a] px-8 py-3.5 tracking-[0.08em] text-[#2a1f15] transition-all duration-300 hover:bg-[#dbb87f] hover:shadow-[0_15px_40px_-12px_rgba(201,163,106,0.6)]"
          >
            {t.schoolTeaser.cta}
            <ArrowRight size={19} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] border border-[#c9a36a]/30" />
            <ImageWithFallback
              src={img}
              alt="Microphone in a warm vocal studio"
              className="relative h-[26rem] w-full rounded-[1.8rem] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

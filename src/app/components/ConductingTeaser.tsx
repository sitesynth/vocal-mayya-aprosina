import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";
import img from "@/assets/conductor.jpg";

export function ConductingTeaser() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const c = t.conductingTeaser;

  return (
    <section className="relative bg-[#f5efe4] overflow-hidden">
      <div className="flex flex-col lg:flex-row" style={{ minHeight: "70vh" }}>

        {/* Left: full-bleed image */}
        <div className="relative lg:w-1/2 h-72 lg:h-auto overflow-hidden flex-shrink-0">
          <ImageWithFallback
            src={img}
            alt="Mayya Aprosina conducting a choir"
            className="h-full w-full object-cover object-top"
          />
        </div>

        {/* Right: text */}
        <div className="flex flex-col justify-center lg:w-1/2 px-8 py-16 lg:px-14 lg:py-24">
          <Reveal>
            <p className="mb-4 tracking-[0.35em] uppercase text-[#a8814c]" style={{ fontSize: "0.78rem" }}>
              {c.eyebrow}
            </p>
            <h2
              className="font-serif text-[#3a2e22]"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)", fontWeight: 500, lineHeight: 1.1 }}
            >
              {c.title1}{" "}
              <span className="italic text-[#8a6a3f]">{c.titleItalic}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <p className="text-[#5a4733]" style={{ fontSize: "1.05rem", lineHeight: 1.85 }}>
              {c.text}
            </p>
            <button
              onClick={() => navigate("/conducting")}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#3a2e22] px-8 py-3.5 tracking-[0.08em] text-[#f8f2e7] transition-all duration-300 hover:bg-[#2a1f15] hover:shadow-[0_15px_40px_-12px_rgba(58,46,34,0.5)]"
            >
              {c.cta}
              <ArrowRight size={19} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

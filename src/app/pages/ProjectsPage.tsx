import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { useLanguage } from "../i18n/LanguageContext";
import { ProjectPlayer } from "../components/ProjectPlayer";
import { projectsMedia } from "../components/projectsMedia";
import strip1 from "@/assets/mayya-stage.jpg";
import strip2 from "@/assets/accordion-bw.jpg";
import strip3 from "@/assets/duo-piano-bw.jpg";
import strip4 from "@/assets/quartet-bw.jpg";
import strip5 from "@/assets/strings-festival-bw.jpg";

const strip = [strip1, strip2, strip3, strip4, strip5];

export function ProjectsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const p = t.projects;
  const tracks = p.items.map((it, i) => ({ ...it, ...projectsMedia[i] }));

  return (
    <div className="bg-[#1f160e] text-[#f3ead9]">
      <section className="relative overflow-hidden px-6 pb-20 pt-36 lg:px-10 lg:pt-44">
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_20%_15%,#c9a36a_0,transparent_45%),radial-gradient(circle_at_80%_85%,#8a6a3f_0,transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl">
          <button
            onClick={() => navigate("/")}
            className="mb-10 inline-flex items-center gap-2 tracking-[0.06em] text-[#e3c89a]/70 transition-colors hover:text-[#e3c89a]"
            style={{ fontSize: "0.92rem" }}
          >
            <ArrowLeft size={18} />
            {p.back}
          </button>

          <Reveal className="max-w-3xl">
            <p className="mb-4 tracking-[0.4em] uppercase text-[#e3c89a]" style={{ fontSize: "0.8rem" }}>
              {p.eyebrow}
            </p>
            <h1
              className="font-serif text-[#f8f2e7]"
              style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 500, lineHeight: 1.05 }}
            >
              {p.title1} <span className="italic text-[#e3c89a]">{p.titleItalic}</span>
            </h1>
            <p className="mt-6 max-w-xl text-[#e7dcc8]/85" style={{ fontSize: "1.2rem", lineHeight: 1.7 }}>
              {p.text}
            </p>
          </Reveal>

          <div className="mt-16">
            <ProjectPlayer tracks={tracks} labels={{ play: p.play, pause: p.pause }} />
          </div>
        </div>
      </section>

      {/* Moments — story-style image strip */}
      <section className="border-t border-[#f3ead9]/10 px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {strip.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`Moment ${i + 1}`}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 5) * 0.07 }}
                className="aspect-[3/4] w-[55vw] max-w-[15rem] shrink-0 snap-center rounded-2xl object-cover grayscale transition-all duration-500 hover:grayscale-0 sm:w-[13rem]"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

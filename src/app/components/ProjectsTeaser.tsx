import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLanguage } from "../i18n/LanguageContext";
import { ProjectPlayer } from "./ProjectPlayer";
import { projectsMedia } from "./projectsMedia";

export function ProjectsTeaser() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const p = t.projects;
  // Teaser shows the first three projects; the full set lives on /projects.
  const tracks = p.items.slice(0, 3).map((it, i) => ({ ...it, ...projectsMedia[i] }));

  return (
    <section className="relative overflow-hidden bg-[#1f160e] py-28 text-[#f3ead9] lg:py-36">
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_15%_20%,#c9a36a_0,transparent_45%),radial-gradient(circle_at_85%_80%,#8a6a3f_0,transparent_40%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 tracking-[0.35em] uppercase text-[#e3c89a]" style={{ fontSize: "0.78rem" }}>
              {p.eyebrow}
            </p>
            <h2
              className="font-serif text-[#f8f2e7]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 500, lineHeight: 1.08 }}
            >
              {p.title1} <span className="italic text-[#e3c89a]">{p.titleItalic}</span>
            </h2>
          </div>
          <button
            onClick={() => navigate("/projects")}
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-[#e3c89a]/40 px-7 py-3 tracking-[0.06em] text-[#e3c89a] transition-all duration-300 hover:border-[#c9a36a] hover:bg-[#c9a36a] hover:text-[#2a1f15]"
          >
            {p.teaserCta}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Reveal>

        <ProjectPlayer tracks={tracks} labels={{ play: p.play, pause: p.pause }} />
      </div>
    </section>
  );
}

import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";
import { ProjectPlayer } from "../components/ProjectPlayer";
import { FeaturedTrackCard } from "../components/FeaturedTrackCard";
import { projectsMedia } from "../components/projectsMedia";

const PO = "/photos/personal%20orjects/";

// Media per featured project — keyed to t.projects.featured[i].key
const FEATURED_MEDIA: Record<
  string,
  {
    cover?: string;
    videoIds?: string[];
    audio: string;
    photos: string[];
  }
> = {
  "dear-friend": {
    videoIds: ["s7s4eO1jXbA", "Y2wCathT-lA"],
    audio: "/audio/dear-friend-is-gone.mp3",
    photos: [
      PO + "Gemini_Generated_Image_bikpt4bikpt4bikp.png",
      PO + "PNiH3yVR4sOlAGyA3Ojf78HJC454CrOYbLpwJnV4mguQCFhjoqi3meZcuBj15bqCVrc-Ag.jpg",
    ],
  },
  mongolia: {
    cover: "/projects/mongolia.jpg",
    audio: "/audio/mongolia.mp3",
    photos: [
      PO + "Gemini_Generated_Image_6zoail6zoail6zoa.png",
      PO + "P7cdfxUSz9BouEE1x2CpJqA_lIeAaY18hWs8BnNt-atpr6DhMjxIsbyMNMqIpw2R-DTv9iVd.jpg",
    ],
  },
  "odi-et-amo": {
    cover: "/projects/odi-et-amo.jpg",
    audio: "/audio/odi-et-amo.mp3",
    photos: [PO + "649170777_26531075483177406_7590211371444720547_n.jpg"],
  },
};

export function ProjectsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const p = t.projects;
  const tracks = p.items.map((it, i) => ({ ...it, ...projectsMedia[i] }));

  return (
    <div className="bg-[#1f160e] text-[#f3ead9]">
      {/* Hero */}
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

          {/* Quick-listen card grid */}
          <div className="mt-16">
            <ProjectPlayer tracks={tracks} labels={{ play: p.play, pause: p.pause }} />
          </div>
        </div>
      </section>

      {/* Featured stories */}
      <section className="border-t border-[#f3ead9]/10 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-16 max-w-2xl">
            <p className="mb-4 tracking-[0.35em] uppercase text-[#e3c89a]" style={{ fontSize: "0.78rem" }}>
              {p.storiesEyebrow}
            </p>
            <h2
              className="font-serif text-[#f8f2e7]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 500, lineHeight: 1.15 }}
            >
              {p.storiesTitle1} <span className="italic text-[#e3c89a]">{p.storiesTitleItalic}</span>
            </h2>
          </Reveal>

          <div className="space-y-24 lg:space-y-32">
            {p.featured.map((f, i) => {
              const media = FEATURED_MEDIA[f.key];
              if (!media) return null;
              const mediaFirst = i % 2 === 0;
              return (
                <div
                  key={f.key}
                  className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
                >
                  {/* Media */}
                  <div
                    className={`lg:col-span-5 ${mediaFirst ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <Reveal>
                      <div className="mx-auto max-w-[24rem]">
                        <FeaturedTrackCard
                          title={f.title}
                          subtitle={f.subtitle}
                          cover={media.cover}
                          videoIds={media.videoIds}
                          audioSrc={media.audio}
                          labels={{ play: p.play, pause: p.pause }}
                        />
                      </div>
                    </Reveal>
                  </div>

                  {/* Text */}
                  <Reveal
                    delay={0.12}
                    className={`lg:col-span-7 ${mediaFirst ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <p className="mb-3 tracking-[0.3em] uppercase text-[#a8814c]" style={{ fontSize: "0.72rem" }}>
                      {f.eyebrow}
                    </p>
                    <h3
                      className="font-serif text-[#f8f2e7]"
                      style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 500, lineHeight: 1.12 }}
                    >
                      {f.title}
                    </h3>
                    <div className="mt-5 space-y-4 text-[#e7dcc8]/85" style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
                      {f.paragraphs.map((par, j) => (
                        <p key={j}>{par}</p>
                      ))}
                    </div>

                    {/* Composer credit (Mongolia) */}
                    {"creditText" in f && f.creditText && (
                      <div className="mt-7 rounded-2xl border border-[#f3ead9]/12 bg-[#241a12]/60 p-6">
                        <p className="mb-1 tracking-[0.25em] uppercase text-[#a8814c]" style={{ fontSize: "0.66rem" }}>
                          {f.creditTitle}
                        </p>
                        <p className="font-serif text-[#f8f2e7]" style={{ fontSize: "1.25rem", fontWeight: 500 }}>
                          {f.creditName}
                        </p>
                        <p className="mt-3 text-[#e7dcc8]/70" style={{ fontSize: "0.95rem", lineHeight: 1.75 }}>
                          {f.creditText}
                        </p>
                      </div>
                    )}

                    {/* Photos */}
                    {media.photos.length > 0 && (
                      <div className="mt-7 flex flex-wrap gap-4">
                        {media.photos.map((src) => (
                          <motion.div
                            key={src}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.6 }}
                            className="h-40 flex-1 overflow-hidden rounded-xl sm:h-48"
                            style={{ minWidth: "9rem" }}
                          >
                            <ImageWithFallback
                              src={src}
                              alt={f.title}
                              className="h-full w-full object-cover transition-transform duration-[1.1s] hover:scale-105"
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

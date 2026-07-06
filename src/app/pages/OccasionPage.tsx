import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Recordings } from "../components/Recordings";
import { VideoGallery } from "../components/VideoGallery";
import { Concerts } from "../components/Concerts";
import { PhotoCarousel } from "../components/PhotoCarousel";
import { useLanguage } from "../i18n/LanguageContext";
import ceremoniesImg from "@/assets/about-4.png";

export type OccasionSlug = "weddings" | "funerals" | "ceremonies" | "concerts";

// Church interior for the wedding ceremony section (replaceable with a real photo).
const CHURCH_IMG = "/photos/bruiloften/Gemini_Generated_Image_qnkul8qnkul8qnku.png";

// slug → hero image + public URL path + schema service type
const CONFIG: Record<OccasionSlug, { image: string; path: string; service: string }> = {
  weddings: { image: "/photos/Optredens/wedding.jpg", path: "/bruiloften", service: "Zangeres voor bruiloften / Wedding singer" },
  funerals: { image: "/photos/Optredens/funeral.png", path: "/uitvaarten", service: "Zangeres voor uitvaarten / Funeral singer" },
  ceremonies: { image: ceremoniesImg, path: "/ceremonies", service: "Kerkmuziek & ceremoniezang / Church & ceremony singer" },
  concerts: { image: "/photos/Optredens/jazz.jpg", path: "/concerten", service: "Concert- & jazzzangeres / Concert & jazz singer" },
};

// Per-section imagery (one array of photos per section), aligned with the
// `sections` array order in translations. Multiple photos → carousel.
const SECTION_IMAGES: Partial<Record<OccasionSlug, string[][]>> = {
  weddings: [
    [CHURCH_IMG],
    [
      "/photos/bruiloften/reception-jazz.jpg",
      "/photos/bruiloften/reception-jazz-2.jpg",
      "/photos/bruiloften/reception-jazz-3.jpg",
    ],
  ],
};

const SITE = "https://mayyaaprosina.com";

export function OccasionPage({ slug }: { slug: OccasionSlug }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const o = t.occasions;
  // Weddings carries the richest shape (sections/showMedia); cast so the optional
  // fields are reachable, and guard on them at runtime for the other occasions.
  const d = o[slug] as (typeof o)["weddings"];
  const cfg = CONFIG[slug];
  const sectionImages = SECTION_IMAGES[slug];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: d.h1a + " " + d.h1i,
    serviceType: cfg.service,
    url: SITE + cfg.path,
    image: SITE + (cfg.image.startsWith("/") ? cfg.image : "/og-image.jpg"),
    provider: { "@type": "Person", name: "Mayya Aprosina", url: SITE + "/" },
    areaServed: o.cities.map((c) => ({ "@type": "City", name: c })),
  };

  return (
    <div className="bg-[#f5efe4] text-[#3a2e22]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative flex min-h-[62vh] items-end overflow-hidden">
        <ImageWithFallback
          src={cfg.image}
          alt={d.h1a + " " + d.h1i + " — Mayya Aprosina"}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f160e]/92 via-[#1f160e]/45 to-[#1f160e]/45" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-32 lg:px-10 lg:pb-20">
          <button
            onClick={() => navigate("/")}
            className="mb-8 inline-flex items-center gap-2 tracking-[0.06em] text-[#e3c89a]/80 transition-colors hover:text-[#e3c89a]"
          >
            <ArrowLeft size={17} /> {o.backHome}
          </button>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-4 tracking-[0.4em] uppercase text-[#e3c89a]"
            style={{ fontSize: "0.78rem" }}
          >
            {d.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[#f8f2e7]"
            style={{ fontSize: "clamp(2.4rem, 7vw, 4.5rem)", fontWeight: 500, lineHeight: 1.05 }}
          >
            {d.h1a} <span className="block italic text-[#e3c89a]">{d.h1i}</span>
          </motion.h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal>
            <div className="space-y-6 text-[#5a4733]" style={{ fontSize: "1.18rem", lineHeight: 1.8 }}>
              {d.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Rich, occasion-specific sections (image + detail) */}
      {d.sections?.map((s, i) => (
        <section key={s.title} className={`py-16 lg:py-20 ${i % 2 === 1 ? "bg-[#efe6d6]" : ""}`}>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <PhotoCarousel images={sectionImages?.[i] ?? [cfg.image]} alt={s.title} />
            </Reveal>
            <Reveal>
              <p className="mb-3 tracking-[0.32em] uppercase text-[#a8814c]" style={{ fontSize: "0.75rem" }}>
                {s.eyebrow}
              </p>
              <h2 className="font-serif text-[#3a2e22]" style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)", fontWeight: 500, lineHeight: 1.12 }}>
                {s.title}
              </h2>
              <p className="mt-5 text-[#5a4733]" style={{ fontSize: "1.12rem", lineHeight: 1.75 }}>
                {s.text}
              </p>

              {"points" in s && s.points && (
                <ul className="mt-6 space-y-3">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-[#5a4733]" style={{ fontSize: "1.06rem", lineHeight: 1.6 }}>
                      <Check size={18} className="mt-1 shrink-0 text-[#8a6a3f]" />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}

              {"variants" in s && s.variants && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {s.variants.map((v) => (
                    <div key={v.name} className="rounded-2xl border border-[#c9a36a]/40 bg-[#faf5ec] p-5">
                      <h3 className="font-serif text-[#8a6a3f]" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                        {v.name}
                      </h3>
                      <p className="mt-2 text-[#5a4733]" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
                        {v.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {"songs" in s && s.songs && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.songs.map((song) => (
                    <span
                      key={song}
                      className="rounded-full border border-[#c9a36a]/50 px-3.5 py-1 font-serif italic text-[#8a6a3f]"
                      style={{ fontSize: "0.93rem" }}
                    >
                      {song}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          </div>
        </section>
      ))}

      {/* What's included — only for occasions without rich sections */}
      {!d.sections && (
        <section className="bg-[#efe6d6] py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <Reveal>
              <p className="mb-10 tracking-[0.35em] uppercase text-[#a8814c]" style={{ fontSize: "0.78rem" }}>
                {o.includesLabel}
              </p>
            </Reveal>
            <div className="grid gap-8 md:grid-cols-3">
              {d.includes.map((it, i) => (
                <Reveal key={it.t} delay={i * 0.08}>
                  <div className="h-full rounded-2xl bg-[#faf5ec] p-7 shadow-[0_20px_50px_-30px_rgba(58,46,34,0.5)]">
                    <h3 className="font-serif text-[#3a2e22]" style={{ fontSize: "1.5rem", fontWeight: 500 }}>
                      {it.t}
                    </h3>
                    <p className="mt-3 text-[#5a4733]" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
                      {it.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How it works — 3 steps (weddings only) */}
      {"steps" in d && d.steps && (
        <section className="bg-[#efe6d6] py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-10">
            <Reveal>
              <p className="mb-12 tracking-[0.35em] uppercase text-[#a8814c]" style={{ fontSize: "0.78rem" }}>
                {o.howLabel}
              </p>
            </Reveal>
            <div className="grid gap-8 md:grid-cols-3">
              {d.steps.map((s, i) => (
                <Reveal key={s.num} delay={i * 0.1}>
                  <div className="relative h-full rounded-2xl bg-[#faf5ec] p-7 shadow-[0_20px_50px_-30px_rgba(58,46,34,0.4)]">
                    <span
                      className="mb-5 block font-serif text-[#c9a36a]/50"
                      style={{ fontSize: "3rem", fontWeight: 600, lineHeight: 1 }}
                    >
                      {s.num}
                    </span>
                    <h3 className="font-serif text-[#3a2e22]" style={{ fontSize: "1.35rem", fontWeight: 500 }}>
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[#5a4733]" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
                      {s.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Agenda */}
      {"showAgenda" in d && d.showAgenda && <Concerts />}

      {/* Region */}
      <section className="bg-[#efe6d6] py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <p className="mb-4 tracking-[0.35em] uppercase text-[#a8814c]" style={{ fontSize: "0.78rem" }}>
              {o.regionLabel}
            </p>
            <p className="max-w-2xl text-[#5a4733]" style={{ fontSize: "1.12rem", lineHeight: 1.7 }}>
              {d.regionText}
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {o.cities.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-[#c9a36a]/40 bg-[#faf5ec] px-4 py-1.5 text-[#6b4f37]"
                  style={{ fontSize: "0.95rem" }}
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Recordings + video, as on the home page */}
      {d.showMedia && (
        <>
          <Recordings />
          <VideoGallery />
        </>
      )}

      {/* FAQ */}
      <section className="relative overflow-hidden bg-[#2c2118] py-20 lg:py-28">
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_20%_50%,#c9a36a_0,transparent_50%),radial-gradient(circle_at_80%_50%,#8a6a3f_0,transparent_45%)]" />
        <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal>
            <p className="mb-10 tracking-[0.35em] uppercase text-[#c9a36a]" style={{ fontSize: "0.78rem" }}>
              {o.faqLabel}
            </p>
          </Reveal>
          <div className="space-y-8">
            {d.faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className="border-b border-[#f3ead9]/10 pb-7">
                  <h3 className="flex items-start gap-3 font-serif text-[#f8f2e7]" style={{ fontSize: "1.3rem", fontWeight: 500 }}>
                    <Check size={19} className="mt-1 shrink-0 text-[#c9a36a]" />
                    {f.q}
                  </h3>
                  <p className="mt-3 pl-8 text-[#e8dcc4]/80" style={{ fontSize: "1.08rem", lineHeight: 1.75 }}>
                    {f.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#2c2118] py-24 text-center text-[#f3ead9] lg:py-32">
        <div className="absolute inset-0 opacity-[0.1] [background-image:radial-gradient(circle_at_25%_20%,#c9a36a_0,transparent_45%),radial-gradient(circle_at_80%_80%,#8a6a3f_0,transparent_40%)]" />
        <div className="relative mx-auto max-w-2xl px-6">
          <h2 className="font-serif text-[#f8f2e7]" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 500, lineHeight: 1.1 }}>
            {d.ctaTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[#e8dcc4]/85" style={{ fontSize: "1.15rem", lineHeight: 1.7 }}>
            {d.ctaText}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate("/#contact")}
              className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-[#c9a36a] px-9 tracking-[0.06em] text-[#2a1f15] transition-all duration-300 hover:bg-[#dbb87f] active:scale-[0.98]"
            >
              {o.cta}
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate("/#performances")}
              className="tracking-[0.06em] text-[#e3c89a]/80 underline-offset-4 transition-colors hover:text-[#e3c89a] hover:underline"
            >
              {o.ctaSecondary}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

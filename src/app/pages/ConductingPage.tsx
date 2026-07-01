import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { LiveVideo } from "../components/VideoPlayer";
import { useLanguage } from "../i18n/LanguageContext";

const DIR = "/photos/Dirigent/";
const heroImg =
  DIR + "EiLg9Rf_x6s5pBh8GExwR--I_ryhT6ZpcRVSDZCw1MnJb8zhv48Butji_Xuymj3CrBwNxqIz.jpg";

// Conducting photos from /public/photos/Dirigent/ — add more here as they are placed there.
const GALLERY: string[] = [
  DIR + "557114631_25086565457628423_225657147874868201_n.jpg",
  DIR + "561161293_25166160506335584_1147184050577068317_n.jpg",
  DIR + "557977127_25086565670961735_8767509317117498666_n.jpg",
  DIR + "G_vUQfhQLBNC0GerTWaxRLRY-_Q9j42wAPuqPexAOEsC_9aHsR49j0CC6WxIp-h610ACs3Tq.jpg",
  DIR + "NK7GVs-eTbD4QrbFALs1zV7KZPPp-Pe8JUdYFD0H5eidbjexgidOfPLxLPzvJCJNEGCKThsn.jpg",
  DIR + "PNiH3yVR4sOlAGyA3Ojf78HJC454CrOYbLpwJnV4mguQCFhjoqi3meZcuBj15bqCVrc-Ag.jpg",
  DIR + "Gemini_Generated_Image_c7h0mxc7h0mxc7h0.png",
];

function GalleryStrip({ images }: { images: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf: number;
    const SPEED = 0.22; // px per frame — slow, gentle drift
    const tick = () => {
      if (!pausedRef.current) {
        track.scrollLeft += SPEED;
        // loop seamlessly once we've scrolled past the first copy of the set
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft -= track.scrollWidth / 2;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const nudge = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    pausedRef.current = true;
    track.scrollBy({ left: dir * 420, behavior: "smooth" });
    window.setTimeout(() => {
      pausedRef.current = false;
    }, 2200);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div ref={trackRef} className="flex items-end gap-5 overflow-x-hidden px-6 lg:gap-7">
        {[...images, ...images].map((src, i) => {
          const tier = i % 3;
          const h = tier === 0 ? "h-64 lg:h-80" : tier === 1 ? "h-52 lg:h-64" : "h-72 lg:h-[22rem]";
          return (
            <div
              key={i}
              className={`shrink-0 overflow-hidden rounded-[1.1rem] shadow-[0_25px_50px_-25px_rgba(58,46,34,0.5)] ${h}`}
            >
              <ImageWithFallback
                src={src}
                alt="Mayya Aprosina conducting"
                className="h-full w-auto object-cover"
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={() => nudge(-1)}
        aria-label="Scroll left"
        className="absolute -left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#6b4f37]/25 bg-[#f8f2e7]/90 text-[#6b4f37] shadow-[0_10px_25px_-10px_rgba(58,46,34,0.4)] transition-colors hover:bg-[#f8f2e7] md:flex"
        style={{ width: 44, height: 44 }}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => nudge(1)}
        aria-label="Scroll right"
        className="absolute -right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#6b4f37]/25 bg-[#f8f2e7]/90 text-[#6b4f37] shadow-[0_10px_25px_-10px_rgba(58,46,34,0.4)] transition-colors hover:bg-[#f8f2e7] md:flex"
        style={{ width: 44, height: 44 }}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export function ConductingPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const c = t.conducting;

  return (
    <div className="bg-[#f5efe4]">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <ImageWithFallback
          src={heroImg}
          alt="Mayya Aprosina conducting an ensemble on stage"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f160e]/92 via-[#1f160e]/45 to-[#1f160e]/50" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-32 lg:px-10 lg:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mb-5 tracking-[0.4em] uppercase text-[#e3c89a]"
            style={{ fontSize: "0.8rem" }}
          >
            {c.heroEyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl font-serif text-[#f8f2e7]"
            style={{ fontSize: "clamp(2.6rem, 7vw, 5rem)", fontWeight: 500, lineHeight: 1.05 }}
          >
            {c.heroTitle1} <span className="italic text-[#e3c89a]">{c.heroTitleItalic}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="mt-6 max-w-xl text-[#f3ead9]/85"
            style={{ fontSize: "1.2rem", lineHeight: 1.7 }}
          >
            {c.heroText}
          </motion.p>
        </div>
      </section>

      {/* Choral conducting — text left, framed video right */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <Reveal className="lg:col-span-5">
            <p className="mb-4 tracking-[0.35em] uppercase text-[#a8814c]" style={{ fontSize: "0.78rem" }}>
              {c.choralEyebrow}
            </p>
            <h2
              className="font-serif text-[#3a2e22]"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.12 }}
            >
              {c.choralTitle1} <span className="italic text-[#8a6a3f]">{c.choralTitleItalic}</span>
            </h2>
            <div className="mt-7 space-y-5 text-[#5a4733]" style={{ fontSize: "1.1rem", lineHeight: 1.85 }}>
              <p>{c.choralP1}</p>
              <p>{c.choralP2}</p>
            </div>
          </Reveal>

          <div className="relative lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-[90%]"
            >
              <div className="absolute -inset-3 rounded-[2rem] border border-[#c9a36a]/40" />
              <div className="relative aspect-square w-full overflow-hidden rounded-[1.8rem] bg-[#2a1f15] shadow-[0_40px_80px_-30px_rgba(58,46,34,0.6)]">
                <LiveVideo videoId="S-CwAw7ruM4" caption={c.choralVideoCaption} hint={c.videoHint} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Symphonic conducting — framed video left, text right (dark) */}
      <section className="bg-[#2c2118] py-24 text-[#f3ead9] lg:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <div className="relative order-2 lg:order-1 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-[90%]"
            >
              <div className="absolute -inset-3 rounded-[2rem] border border-[#c9a36a]/40" />
              <div className="relative aspect-square w-full overflow-hidden rounded-[1.8rem] bg-black shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
                <LiveVideo videoId="1BZ8KZpn0L8" caption={c.symphonicVideoCaption} hint={c.videoHint} />
              </div>
            </motion.div>
          </div>

          <Reveal className="order-1 lg:order-2 lg:col-span-5">
            <p className="mb-4 tracking-[0.35em] uppercase text-[#e3c89a]" style={{ fontSize: "0.78rem" }}>
              {c.symphonicEyebrow}
            </p>
            <h2
              className="font-serif text-[#f8f2e7]"
              style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 500, lineHeight: 1.12 }}
            >
              {c.symphonicTitle1} <span className="italic text-[#e3c89a]">{c.symphonicTitleItalic}</span>
            </h2>
            <div className="mt-7 space-y-5 text-[#e7dcc8]/85" style={{ fontSize: "1.1rem", lineHeight: 1.85 }}>
              <p>{c.symphonicP1}</p>
              <p>{c.symphonicP2}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery — auto-scrolling photo strip, varied heights */}
      {GALLERY.length > 0 && (
        <section className="bg-[#efe6d6] py-24 lg:py-32">
          <Reveal className="mx-auto mb-14 max-w-6xl px-6 text-center lg:px-10">
            <p className="mb-4 tracking-[0.35em] uppercase text-[#a8814c]" style={{ fontSize: "0.78rem" }}>
              {c.galleryEyebrow}
            </p>
            <h2
              className="font-serif text-[#3a2e22]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 500, lineHeight: 1.15 }}
            >
              {c.galleryTitle1} <span className="italic text-[#8a6a3f]">{c.galleryTitleItalic}</span>
            </h2>
          </Reveal>

          <GalleryStrip images={GALLERY} />
        </section>
      )}

      {/* Booking CTA */}
      <section className="py-24 lg:py-28">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h2
            className="font-serif text-[#3a2e22]"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 500, lineHeight: 1.15 }}
          >
            {c.ctaTitle}
          </h2>
          <p className="mt-4 text-[#5a4733]" style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            {c.ctaText}
          </p>
          <button
            onClick={() => navigate("/?subject=conducting#contact")}
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#6b4f37] px-9 py-4 tracking-[0.08em] text-[#f8f2e7] transition-all duration-300 hover:bg-[#54402c] hover:shadow-[0_15px_40px_-12px_rgba(107,79,55,0.6)]"
          >
            {c.ctaButton}
            <ArrowRight size={19} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <div>
            <button
              onClick={() => navigate("/")}
              className="mt-8 inline-flex items-center gap-2 text-[#6b4f37] transition-opacity hover:opacity-60"
              style={{ fontSize: "0.95rem" }}
            >
              <ArrowLeft size={16} />
              {c.back}
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLanguage } from "../i18n/LanguageContext";

// Mayya's own clips, served from /public/video. `vertical` controls the
// object-fit: portrait phone videos fill the card, the landscape recital
// clip is shown in full (letterboxed).
const media = [
  { src: "/video/story-1.mp4", poster: "/video/story-1.jpg", vertical: true },
  { src: "/video/ravel-greek-songs.mp4", poster: "/video/ravel-greek-songs.jpg", vertical: true },
  { src: "/video/story-3.mp4", poster: "/video/story-3.jpg", vertical: true },
  { src: "/video/iris.mp4", poster: "/video/iris.jpg", vertical: true },
];

export function VideoGallery() {
  const { t } = useLanguage();
  const videos = t.video.items.map((it, i) => ({ ...it, ...media[i] }));
  const refs = useRef<Array<HTMLVideoElement | null>>([]);
  const [playing, setPlaying] = useState<number | null>(null);

  const toggle = (i: number) => {
    const v = refs.current[i];
    if (!v) return;
    if (playing === i && !v.paused) {
      v.pause();
      return;
    }
    refs.current.forEach((other, j) => {
      if (other && j !== i) other.pause();
    });
    void v.play();
  };

  return (
    <section id="video" className="relative bg-[#f5efe4] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 tracking-[0.35em] uppercase text-[#a8814c]" style={{ fontSize: "0.78rem" }}>
            {t.video.eyebrow}
          </p>
          <h2 className="font-serif text-[#3a2e22]" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 500, lineHeight: 1.15 }}>
            {t.video.title1} <span className="italic text-[#8a6a3f]">{t.video.titleItalic}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[#5a4733]" style={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
            {t.video.text}
          </p>
        </Reveal>

        <div className="mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:pb-0">
          {videos.map((v, i) => {
            const isPlaying = playing === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 4) * 0.08 }}
                className="group relative aspect-[9/16] w-[74vw] max-w-[19rem] shrink-0 snap-center overflow-hidden rounded-[1.4rem] bg-[#241a12] shadow-[0_25px_60px_-35px_rgba(58,46,34,0.65)] sm:w-[15rem] lg:w-auto lg:max-w-none"
              >
                <video
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  src={v.src}
                  poster={v.poster}
                  playsInline
                  preload="none"
                  onClick={() => toggle(i)}
                  onPlay={() => setPlaying(i)}
                  onPause={() => setPlaying((p) => (p === i ? null : p))}
                  onEnded={() => setPlaying((p) => (p === i ? null : p))}
                  className={`absolute inset-0 h-full w-full cursor-pointer ${v.vertical ? "object-cover" : "object-contain"}`}
                />

                {/* Tap-to-play overlay — fades out while the clip plays */}
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-label={v.title}
                  className={`absolute inset-0 flex flex-col justify-end text-left transition-opacity duration-300 ${
                    isPlaying ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a130c]/85 via-[#1a130c]/10 to-[#1a130c]/35" />
                  <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f8f2e7]/15 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#c9a36a]">
                    <Play size={26} className="ml-1 text-[#f8f2e7] transition-colors group-hover:text-[#2a1f15]" />
                  </span>
                  <div className="relative p-5">
                    <p className="tracking-[0.3em] uppercase text-[#e3c89a]" style={{ fontSize: "0.62rem" }}>
                      {v.category}
                    </p>
                    <h3 className="mt-1 font-serif text-[#f8f2e7]" style={{ fontSize: "1.2rem", fontWeight: 500 }}>
                      {v.title}
                    </h3>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

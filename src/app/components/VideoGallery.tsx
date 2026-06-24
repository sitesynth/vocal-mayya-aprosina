import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";

type Video = {
  id: number;
  title: string;
  category: string;
  poster: string;
  src: string;
};

// Replace with your own video recordings (.mp4) and posters.
const videoMedia = [
  {
    poster: "https://images.unsplash.com/photo-1697206897349-f782a7f1ae01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    src: "https://cdn.coverr.co/videos/coverr-candles-in-a-church-1572/1080p.mp4",
  },
  {
    poster: "https://images.unsplash.com/photo-1565879629766-30adf38aac56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    src: "https://cdn.coverr.co/videos/coverr-playing-the-piano-1572/1080p.mp4",
  },
  {
    poster: "https://images.unsplash.com/photo-1699521376676-69aae178961b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    src: "https://cdn.coverr.co/videos/coverr-playing-the-piano-1572/1080p.mp4",
  },
];

export function VideoGallery() {
  const { t } = useLanguage();
  const videos: Video[] = t.video.items.map((it, i) => ({
    id: i + 1,
    title: it.title,
    category: it.category,
    poster: videoMedia[i].poster,
    src: videoMedia[i].src,
  }));
  const [open, setOpen] = useState<Video | null>(null);

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

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => (
            <motion.button
              key={v.id}
              onClick={() => setOpen(v)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl text-left shadow-[0_25px_60px_-35px_rgba(58,46,34,0.6)]"
            >
              <ImageWithFallback
                src={v.poster}
                alt={v.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f15]/85 via-[#2a1f15]/20 to-transparent" />

              <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#f8f2e7]/15 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-[#c9a36a]">
                <Play size={26} className="ml-1 text-[#f8f2e7] transition-colors group-hover:text-[#2a1f15]" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="tracking-[0.3em] uppercase text-[#e3c89a]" style={{ fontSize: "0.7rem" }}>
                  {v.category}
                </p>
                <h3 className="mt-1 font-serif text-[#f8f2e7]" style={{ fontSize: "1.4rem", fontWeight: 500 }}>
                  {v.title}
                </h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1a130c]/90 p-4 backdrop-blur-sm"
          >
            <button
              className="absolute right-6 top-6 text-[#f3ead9]/80 transition-colors hover:text-white"
              aria-label={t.video.close}
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
            >
              <video
                className="aspect-video w-full bg-black"
                controls
                autoPlay
                poster={open.poster}
              >
                <source src={open.src} type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

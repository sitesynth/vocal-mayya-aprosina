import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { VideoModal } from "./VideoPlayer";

function fmt(t: number) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// A Spotify-style card: a square cover (static image or a living, muted looping
// video) with a play button that plays the track's audio and a seekable bar.
export function FeaturedTrackCard({
  title,
  subtitle,
  cover,
  videoIds,
  videoFocusX = 0,
  audioSrc,
  labels,
}: {
  title: string;
  subtitle: string;
  cover?: string;
  videoIds?: string[];
  // Extra horizontal nudge (percent of the frame) applied to the living
  // video cover, e.g. -6 shifts the visible crop left. 0 = centered.
  videoFocusX?: number;
  audioSrc?: string;
  labels: { play: string; pause: string };
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [vidIdx, setVidIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Rotate through the living-cover videos when there is more than one.
  useEffect(() => {
    if (!videoIds || videoIds.length < 2) return;
    const id = setInterval(() => setVidIdx((i) => (i + 1) % videoIds.length), 13000);
    return () => clearInterval(id);
  }, [videoIds]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = () => {
    if (!audioSrc) {
      setModalOpen(true);
      return;
    }
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      void a.play();
      setPlaying(true);
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  const pct = duration ? (progress / duration) * 100 : 0;
  const hasVideo = !!(videoIds && videoIds.length);
  const activeVid = hasVideo ? videoIds![vidIdx % videoIds!.length] : null;
  const previewSrc = activeVid
    ? `https://www.youtube.com/embed/${activeVid}?autoplay=1&mute=1&loop=1&playlist=${activeVid}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0`
    : null;

  return (
    <div className="overflow-hidden rounded-[1.6rem] bg-[#241a12] shadow-[0_35px_70px_-35px_rgba(0,0,0,0.85)] ring-1 ring-[#f3ead9]/10">
      <div className="group relative aspect-square w-full overflow-hidden">
        {hasVideo ? (
          <div className="pointer-events-none absolute inset-0 bg-black">
            <AnimatePresence>
              <motion.iframe
                key={activeVid}
                src={previewSrc!}
                title={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1 }}
                className="absolute left-1/2 top-1/2 h-full w-[177.78%]"
                style={{ transform: `translate(calc(-50% + ${videoFocusX}%), -50%) scale(1.25)` }}
                allow="autoplay; encrypted-media"
                tabIndex={-1}
              />
            </AnimatePresence>
          </div>
        ) : (
          <ImageWithFallback
            src={cover}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-[1.1s] group-hover:scale-105"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#120c07]/80 via-transparent to-transparent" />

        {hasVideo && (
          <span
            className="absolute left-4 top-4 rounded-full bg-[#120c07]/55 px-3 py-1 tracking-[0.15em] uppercase text-[#e3c89a] backdrop-blur-[2px]"
            style={{ fontSize: "0.62rem" }}
          >
            Live
          </span>
        )}

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? labels.pause : labels.play}
          className="absolute bottom-4 right-4 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#c9a36a] text-[#2a1f15] shadow-[0_10px_25px_-8px_rgba(201,163,106,0.8)] transition-all duration-300 hover:bg-[#dbb87f]"
        >
          {playing ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
        </button>
      </div>

      <div className="px-5 pb-5 pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-serif text-[#f8f2e7]" style={{ fontSize: "1.3rem", fontWeight: 500 }}>
              {title}
            </p>
            <p className="truncate text-[#e3c89a]/70" style={{ fontSize: "0.9rem" }}>
              {subtitle}
            </p>
          </div>
          {audioSrc && (
            <span className="shrink-0 tabular-nums text-[#e7dcc8]/60" style={{ fontSize: "0.82rem" }}>
              {fmt(progress)}
            </span>
          )}
        </div>
        {audioSrc && (
          <div
            onClick={seek}
            className="mt-4 h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-[#f3ead9]/15"
          >
            <div className="h-full rounded-full bg-[#c9a36a]" style={{ width: `${pct}%` }} />
          </div>
        )}
      </div>

      {audioSrc && <audio ref={audioRef} preload="none" src={audioSrc} />}

      {!audioSrc && hasVideo && (
        <AnimatePresence>
          {modalOpen && (
            <VideoModal videoId={activeVid as string} caption={title} onClose={() => setModalOpen(false)} />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

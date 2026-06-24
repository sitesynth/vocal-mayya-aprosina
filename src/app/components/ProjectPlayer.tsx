import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Play, Pause } from "lucide-react";

export type ProjectTrack = {
  title: string;
  subtitle: string;
  cover: string;
  src: string;
};

function fmt(t: number) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ProjectPlayer({
  tracks,
  labels,
}: {
  tracks: ProjectTrack[];
  labels: { play: string; pause: string };
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.currentTime);
    const onMeta = () => setDuration(a.duration);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, [current]);

  const toggle = (i: number) => {
    const a = audioRef.current;
    if (!a) return;
    if (current === i) {
      if (playing) {
        a.pause();
        setPlaying(false);
      } else {
        void a.play();
        setPlaying(true);
      }
    } else {
      setCurrent(i);
      setProgress(0);
      a.src = tracks[i].src;
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

  return (
    <>
      <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {tracks.map((track, i) => {
          const active = current === i;
          const isPlaying = active && playing;
          const pct = active && duration ? (progress / duration) * 100 : 0;
          return (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className="group"
            >
              <div
                className={`relative aspect-square overflow-hidden rounded-2xl bg-[#241a12] shadow-[0_25px_55px_-30px_rgba(0,0,0,0.8)] ring-1 transition-all duration-300 ${
                  active ? "ring-[#c9a36a]/70" : "ring-[#f3ead9]/10"
                }`}
              >
                <img
                  src={track.cover}
                  alt={track.title}
                  className="h-full w-full object-cover transition-transform duration-[1.1s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120c07]/75 via-transparent to-transparent" />

                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-label={isPlaying ? labels.pause : labels.play}
                  className={`absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#c9a36a] text-[#2a1f15] shadow-[0_10px_25px_-8px_rgba(201,163,106,0.8)] transition-all duration-300 hover:bg-[#dbb87f] ${
                    isPlaying
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                  }`}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                </button>

                {active && (
                  <div className="absolute inset-x-0 bottom-0 p-2.5">
                    <div
                      onClick={seek}
                      className="h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-[#f3ead9]/20"
                    >
                      <div className="h-full rounded-full bg-[#c9a36a]" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-baseline justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-serif text-[#f8f2e7]" style={{ fontSize: "1.15rem", fontWeight: 500 }}>
                    {track.title}
                  </p>
                  <p className="truncate text-[#e3c89a]/70" style={{ fontSize: "0.88rem" }}>
                    {track.subtitle}
                  </p>
                </div>
                {active && (
                  <span className="shrink-0 tabular-nums text-[#e7dcc8]/60" style={{ fontSize: "0.8rem" }}>
                    {fmt(progress)}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <audio ref={audioRef} preload="none" />
    </>
  );
}

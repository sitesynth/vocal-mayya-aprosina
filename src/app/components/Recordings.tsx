import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLanguage } from "../i18n/LanguageContext";

type Track = {
  id: number;
  title: string;
  category: string;
  src: string;
};

// Mayya's own recordings, served from /public/audio.
const trackSrc = [
  "/audio/carmina-burana-in-trutina.mp3",
  "/audio/piangero.mp3",
  "/audio/partskhaladze-lake.mp3",
];

function fmt(t: number) {
  if (!isFinite(t)) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function Recordings() {
  const { t } = useLanguage();
  const tracks: Track[] = t.recordings.items.map((it, i) => ({
    id: i + 1,
    title: it.title,
    category: it.category,
    src: trackSrc[i],
  }));
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

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

  useEffect(() => {
    const a = audioRef.current;
    if (a) a.volume = volume;
  }, [volume]);

  const toggle = (track: Track) => {
    const a = audioRef.current;
    if (!a) return;
    if (current === track.id) {
      if (playing) {
        a.pause();
        setPlaying(false);
      } else {
        a.play();
        setPlaying(true);
      }
    } else {
      setCurrent(track.id);
      a.src = track.src;
      a.play();
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
    <section id="recordings" className="relative bg-[#2c2118] py-28 text-[#f3ead9] lg:py-36">
      <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_30%,#c9a36a_0,transparent_45%),radial-gradient(circle_at_80%_70%,#8a6a3f_0,transparent_40%)]" />
      <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal className="text-center">
          <p className="mb-4 tracking-[0.35em] uppercase text-[#e3c89a]" style={{ fontSize: "0.78rem" }}>
            {t.recordings.eyebrow}
          </p>
          <h2 className="font-serif text-[#f8f2e7]" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 500, lineHeight: 1.15 }}>
            {t.recordings.title1} <span className="italic text-[#e3c89a]">{t.recordings.titleItalic}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[#e7dcc8]/80" style={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
            {t.recordings.text}
          </p>
        </Reveal>

        <div className="mt-14 space-y-3">
          {tracks.map((track, i) => {
            const active = current === track.id;
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`overflow-hidden rounded-xl border transition-colors duration-300 ${
                  active ? "border-[#c9a36a]/60 bg-[#3a2c1f]" : "border-[#f3ead9]/10 bg-[#34281c]/60"
                }`}
              >
                <div className="flex items-center gap-5 p-4 sm:p-5">
                  <button
                    onClick={() => toggle(track)}
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      active && playing
                        ? "bg-[#c9a36a] text-[#2a1f15]"
                        : "bg-[#f3ead9]/10 text-[#e3c89a] hover:bg-[#c9a36a] hover:text-[#2a1f15]"
                    }`}
                    aria-label={active && playing ? t.recordings.pause : t.recordings.play}
                  >
                    {active && playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                  </button>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-[#f8f2e7]" style={{ fontSize: "1.2rem", fontWeight: 500 }}>
                      {track.title}
                    </p>
                    <p className="tracking-[0.04em] text-[#e3c89a]/70" style={{ fontSize: "0.9rem" }}>
                      {track.category}
                    </p>
                  </div>

                  {active && (
                    <div className="hidden shrink-0 items-center gap-3 sm:flex">
                      <span className="tabular-nums text-[#e7dcc8]/70" style={{ fontSize: "0.9rem" }}>
                        {fmt(progress)} / {fmt(duration)}
                      </span>
                      <button
                        onClick={() => setVolume((v) => (v === 0 ? 1 : 0))}
                        className="text-[#e3c89a]/70 transition-colors hover:text-[#e3c89a]"
                        aria-label={volume === 0 ? t.recordings.unmute : t.recordings.mute}
                      >
                        {volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        onClick={(e) => e.stopPropagation()}
                        className="h-1 w-20 cursor-pointer accent-[#c9a36a]"
                        aria-label={t.recordings.volume}
                      />
                    </div>
                  )}
                </div>

                {active && (
                  <div className="flex items-center gap-4 px-5 pb-5">
                    <div
                      onClick={seek}
                      className="group h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-[#f3ead9]/15"
                    >
                      <div
                        className="h-full rounded-full bg-[#c9a36a] transition-[width]"
                        style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }}
                      />
                    </div>
                    <button
                      onClick={() => setVolume((v) => (v === 0 ? 1 : 0))}
                      className="shrink-0 text-[#e3c89a]/70 transition-colors hover:text-[#e3c89a] sm:hidden"
                      aria-label={volume === 0 ? t.recordings.unmute : t.recordings.mute}
                    >
                      {volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="h-1 w-16 shrink-0 cursor-pointer accent-[#c9a36a] sm:hidden"
                      aria-label={t.recordings.volume}
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <audio ref={audioRef} preload="metadata" />
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, X } from "lucide-react";

export function VideoModal({
  videoId,
  caption,
  onClose,
}: {
  videoId: string;
  caption: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&playsinline=1&modestbranding=1`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#100b06]/85 p-4 backdrop-blur-sm"
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#f8f2e7]/40 text-[#f8f2e7] transition-colors hover:bg-[#f8f2e7]/10"
        aria-label="Close"
      >
        <X size={22} />
      </button>
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="aspect-video w-full max-w-5xl overflow-hidden rounded-[1.25rem] bg-black shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]"
      >
        <iframe
          src={src}
          title={caption}
          className="h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
}

// Muted looping preview that fills its positioned parent; click opens a modal with sound.
export function LiveVideo({
  videoId,
  caption,
  hint,
}: {
  videoId: string;
  caption: string;
  hint: string;
}) {
  const [open, setOpen] = useState(false);
  const previewSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0`;

  return (
    <>
      <div className="pointer-events-none absolute inset-0">
        <iframe
          src={previewSrc}
          title={caption}
          className="absolute left-1/2 top-1/2 h-full w-[177.78%] -translate-x-1/2 -translate-y-1/2"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
        />
      </div>
      <button
        onClick={() => setOpen(true)}
        className="group absolute inset-0 z-10 flex items-end justify-end bg-[#1f160e]/20 p-5 transition-colors duration-300 hover:bg-[#1f160e]/35"
        aria-label={hint}
      >
        <span className="flex items-center gap-3">
          <span
            className="tracking-[0.15em] uppercase text-[#f8f2e7]/85"
            style={{ fontSize: "0.68rem" }}
          >
            {hint}
          </span>
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f8f2e7]/70 text-[#f8f2e7] backdrop-blur-[2px] transition-all duration-300 group-hover:scale-110 group-hover:border-[#f8f2e7]">
            <Play size={20} className="ml-0.5" />
          </span>
        </span>
      </button>

      <AnimatePresence>
        {open && <VideoModal videoId={videoId} caption={caption} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

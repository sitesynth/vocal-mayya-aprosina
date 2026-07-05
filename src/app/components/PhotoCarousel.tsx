import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useSwipe } from "../hooks/useSwipe";

/**
 * Simple image carousel — crossfade, dots, swipe and auto-advance.
 * With a single image it just renders that image (no controls).
 */
export function PhotoCarousel({
  images,
  alt,
  interval = 4500,
}: {
  images: string[];
  alt: string;
  interval?: number;
}) {
  const [idx, setIdx] = useState(0);
  const n = images.length;
  const go = (i: number) => setIdx((i + n) % n);

  useEffect(() => {
    if (n < 2) return;
    const id = setInterval(() => setIdx((p) => (p + 1) % n), interval);
    return () => clearInterval(id);
  }, [n, interval]);

  const swipe = useSwipe(
    () => go(idx + 1),
    () => go(idx - 1),
  );

  return (
    <div
      {...swipe}
      className="relative aspect-[4/3] touch-pan-y select-none overflow-hidden rounded-[1.6rem] bg-[#2a1f15] shadow-[0_35px_70px_-35px_rgba(58,46,34,0.6)]"
    >
      <AnimatePresence>
        <motion.div
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <ImageWithFallback src={images[idx]} alt={alt} className="h-full w-full object-cover" />
        </motion.div>
      </AnimatePresence>

      {n > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Foto ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === idx ? "w-6 bg-[#f3ead9]" : "w-2 bg-[#f3ead9]/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

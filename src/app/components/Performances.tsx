import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";
import { useSwipe } from "../hooks/useSwipe";

// Detail page per performance tab, in the same order as the items list.
const OCCASION_PATHS = ["/ceremonies", "/bruiloften", "/uitvaarten", "/concerten"];

type Item = {
  num: string;
  title: string;
  text: string;
  repertoire: readonly string[];
  image: string;
  alt: string;
};

const media = [
  {
    image:
      "https://images.unsplash.com/photo-1697206897349-f782a7f1ae01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Singer before a stained glass window in a church",
  },
  {
    image: "/photos/Optredens/wedding.jpg",
    alt: "Bride and groom holding hands, wedding bouquet",
  },
  {
    image: "/photos/Optredens/funeral.png",
    alt: "Flowers on a casket at a farewell ceremony",
  },
  {
    image: "/photos/Optredens/jazz.jpg",
    alt: "Grand piano and drum kit in a recording studio",
  },
];

const variants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 32 : -32,
  }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -32 : 32,
  }),
};

export function Performances() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const items: Item[] = t.performances.items.map((it, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: it.title,
    text: it.text,
    repertoire: it.repertoire,
    image: media[i].image,
    alt: media[i].alt,
  }));

  useEffect(() => {
    const id = setInterval(() => {
      setDir(1);
      setActive((prev) => (prev + 1) % items.length);
    }, 7000);
    return () => clearInterval(id);
  }, [items.length]);

  const paginate = (d: number) => {
    setDir(d);
    setActive((prev) => (prev + d + items.length) % items.length);
  };

  const swipe = useSwipe(
    () => paginate(1),
    () => paginate(-1),
  );

  const item = items[active];

  return (
    <section
      id="performances"
      className="relative bg-[#f5efe4] py-28 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p
            className="mb-4 tracking-[0.35em] uppercase text-[#a8814c]"
            style={{ fontSize: "0.78rem" }}
          >
            {t.performances.eyebrow}
          </p>
          <h2
            className="font-serif text-[#3a2e22]"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 500,
              lineHeight: 1.08,
            }}
          >
            {t.performances.title1}
            <br />
            <span className="italic text-[#8a6a3f]">
              {t.performances.titleItalic}
            </span>
          </h2>
        </Reveal>

        {/* Tabs */}
        <div className="mt-14 flex flex-wrap gap-2 lg:gap-0 border-b border-[#d9c9ae]">
          {items.map((it, i) => (
            <button
              key={it.num}
              onClick={() => {
                setDir(i > active ? 1 : -1);
                setActive(i);
              }}
              className="relative px-6 py-4 font-serif text-base transition-colors duration-200 focus:outline-none"
              style={{
                color: active === i ? "#3a2e22" : "#8a6a3f",
                fontWeight: active === i ? 500 : 400,
              }}
            >
              <span className="mr-2 font-sans text-xs tracking-widest text-[#c9a36a]">
                {it.num}
              </span>
              {it.title}
              {active === i && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c9a36a]"
                  transition={{ type: "spring", stiffness: 180, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-16 overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
            >
              {/* Image */}
              <div {...swipe} className="relative touch-pan-y select-none">
                <span
                  className="pointer-events-none absolute -top-10 left-2 font-serif text-[#c9a36a]/25 lg:-top-16"
                  style={{
                    fontSize: "clamp(5rem, 12vw, 11rem)",
                    fontWeight: 600,
                    lineHeight: 1,
                  }}
                >
                  {item.num}
                </span>
                <ImageWithFallback
                  src={item.image}
                  alt={item.alt}
                  className="relative aspect-[4/5] w-full rounded-[1.5rem] object-cover shadow-[0_40px_80px_-35px_rgba(58,46,34,0.6)]"
                />
              </div>

              {/* Text */}
              <div>
                <div className="h-px w-16 bg-[#c9a36a]" />
                <h3
                  className="mt-6 font-serif text-[#3a2e22]"
                  style={{
                    fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                    fontWeight: 500,
                    lineHeight: 1.1,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-5 max-w-md text-[#5a4733]"
                  style={{ fontSize: "1.15rem", lineHeight: 1.8 }}
                >
                  {item.text}
                </p>
                <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                  {item.repertoire.map((r) => (
                    <li
                      key={r}
                      className="font-serif italic text-[#8a6a3f]"
                      style={{ fontSize: "1.1rem" }}
                    >
                      {r}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col items-start gap-5">
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                      className="rounded-full bg-[#c9a36a] px-8 py-3.5 tracking-[0.08em] text-[#2a1f15] shadow-[0_10px_25px_-8px_rgba(201,163,106,0.6)] transition-all duration-300 hover:bg-[#dbb87f]"
                    >
                      {t.nav.book}
                    </button>
                    <button
                      onClick={() => navigate(OCCASION_PATHS[active])}
                      className="rounded-full border border-[#6b4f37] px-8 py-3.5 tracking-[0.08em] text-[#6b4f37] transition-all duration-300 hover:bg-[#6b4f37] hover:text-[#f8f2e7]"
                    >
                      {t.performances.pageLink}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => document.querySelector("#recordings")?.scrollIntoView({ behavior: "smooth" })}
                    className="group inline-flex min-h-[44px] items-center gap-2 py-2 tracking-[0.06em] text-[#8a6a3f] transition-colors hover:text-[#6b4f37]"
                  >
                    {t.hero.cta2}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>

                {/* Dot navigation */}
                <div className="mt-10 flex gap-3">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setDir(i > active ? 1 : -1);
                        setActive(i);
                      }}
                      className="flex items-center justify-center px-2 py-4 focus:outline-none"
                      aria-label={`Go to ${items[i].title}`}
                    >
                      <span
                        className="block h-2 rounded-full transition-all duration-300"
                        style={{
                          width: active === i ? "2rem" : "0.5rem",
                          background: active === i ? "#c9a36a" : "#d9c9ae",
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

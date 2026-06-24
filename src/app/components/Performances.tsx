import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";

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
    image:
      "https://images.unsplash.com/photo-1566902249079-c97d67671278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Couple dancing at a celebration",
  },
  {
    image:
      "https://images.unsplash.com/photo-1699830506478-af7b3f5e6cc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Quiet church interior with stained glass windows",
  },
  {
    image:
      "https://images.unsplash.com/photo-1565879629766-30adf38aac56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    alt: "Flowers resting on a grand piano",
  },
];

function Row({ item, index }: { item: Item; index: number }) {
  const flipped = index % 2 === 1;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`relative ${flipped ? "lg:order-2" : ""}`}
      >
        <span
          className="pointer-events-none absolute -top-10 left-2 font-serif text-[#c9a36a]/30 lg:-top-16"
          style={{ fontSize: "clamp(5rem, 12vw, 11rem)", fontWeight: 600, lineHeight: 1 }}
        >
          {item.num}
        </span>
        <ImageWithFallback
          src={item.image}
          alt={item.alt}
          className="relative aspect-[4/5] w-full rounded-[1.5rem] object-cover shadow-[0_40px_80px_-35px_rgba(58,46,34,0.6)]"
        />
      </motion.div>

      <Reveal className={flipped ? "lg:order-1" : ""}>
        <div className="h-px w-16 bg-[#c9a36a]" />
        <h3
          className="mt-6 font-serif text-[#3a2e22]"
          style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 500, lineHeight: 1.1 }}
        >
          {item.title}
        </h3>
        <p className="mt-5 max-w-md text-[#5a4733]" style={{ fontSize: "1.15rem", lineHeight: 1.8 }}>
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
      </Reveal>
    </div>
  );
}

export function Performances() {
  const { t } = useLanguage();
  const items: Item[] = t.performances.items.map((it, i) => ({
    num: String(i + 1).padStart(2, "0"),
    title: it.title,
    text: it.text,
    repertoire: it.repertoire,
    image: media[i].image,
    alt: media[i].alt,
  }));

  return (
    <section id="performances" className="relative bg-[#f5efe4] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="mb-4 tracking-[0.35em] uppercase text-[#a8814c]" style={{ fontSize: "0.78rem" }}>
            {t.performances.eyebrow}
          </p>
          <h2
            className="font-serif text-[#3a2e22]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 500, lineHeight: 1.08 }}
          >
            {t.performances.title1}
            <br />
            <span className="italic text-[#8a6a3f]">{t.performances.titleItalic}</span>
          </h2>
        </Reveal>

        <div className="mt-24 space-y-28 lg:space-y-40">
          {items.map((item, i) => (
            <Row key={item.num} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../i18n/LanguageContext";

const conductorImg =
  "/photos/home/Dirigiren/EiLg9Rf_x6s5pBh8GExwR--I_ryhT6ZpcRVSDZCw1MnJb8zhv48Butji_Xuymj3CrBwNxqIz.jpg";
const projectImg =
  "/photos/home/personeliojkeprojected/Gemini_Generated_Image_bikpt4bikpt4bikp.png";

export function SecondaryTeasers() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const cards = [
    {
      eyebrow: t.conductingTeaser.eyebrow,
      title1: t.conductingTeaser.title1,
      titleItalic: t.conductingTeaser.titleItalic,
      text: t.conductingTeaser.text,
      cta: t.conductingTeaser.cta,
      image: conductorImg,
      alt: "Mayya Aprosina conducting a choir",
      to: "/conducting",
    },
    {
      eyebrow: t.projects.eyebrow,
      title1: t.projects.title1,
      titleItalic: t.projects.titleItalic,
      text: t.projects.text,
      cta: t.projects.teaserCta,
      image: projectImg,
      alt: "Mayya Aprosina in the recording studio",
      to: "/projects",
    },
  ];

  return (
    <section className="relative bg-[#f5efe4] py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
          {cards.map((card, i) => (
            <Reveal key={card.to} delay={i * 0.1}>
              <motion.button
                onClick={() => navigate(card.to)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group flex h-full w-full flex-col overflow-hidden rounded-[1.5rem] bg-[#fbf7ef] text-left shadow-[0_25px_60px_-35px_rgba(58,46,34,0.5)] ring-1 ring-[#c9a36a]/20"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden lg:h-64">
                  <ImageWithFallback
                    src={card.image}
                    alt={card.alt}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f160e]/25 to-transparent" />
                </div>

                {/* Text */}
                <div className="flex flex-1 flex-col p-7 lg:p-8">
                  <p
                    className="mb-3 tracking-[0.3em] uppercase text-[#a8814c]"
                    style={{ fontSize: "0.72rem" }}
                  >
                    {card.eyebrow}
                  </p>
                  <h3
                    className="font-serif text-[#3a2e22]"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.9rem)", fontWeight: 500, lineHeight: 1.15 }}
                  >
                    {card.title1}{" "}
                    <span className="italic text-[#8a6a3f]">{card.titleItalic}</span>
                  </h3>
                  <p
                    className="mt-4 flex-1 text-[#5a4733]"
                    style={{ fontSize: "1rem", lineHeight: 1.7 }}
                  >
                    {card.text}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans tracking-[0.04em] text-[#6b4f37]" style={{ fontSize: "0.92rem" }}>
                    {card.cta}
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </span>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

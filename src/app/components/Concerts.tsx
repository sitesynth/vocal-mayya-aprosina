import { motion } from "motion/react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { useLanguage } from "../i18n/LanguageContext";

type Concert = {
  day: string;
  month: string;
  year: string;
  title: string;
  type: string;
  venue: string;
  city: string;
  time: string;
  soldOut?: boolean;
};

export function Concerts() {
  const { t } = useLanguage();
  const concerts = t.concerts.items as readonly Concert[];

  const reserve = (c: Concert) => {
    if (c.soldOut) return;
    toast.success(t.concerts.toast(c.title));
  };

  return (
    <section id="concerts" className="relative bg-[#efe6d6] py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 tracking-[0.35em] uppercase text-[#a8814c]" style={{ fontSize: "0.78rem" }}>
              {t.concerts.eyebrow}
            </p>
            <h2
              className="font-serif text-[#3a2e22]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 500, lineHeight: 1.08 }}
            >
              {t.concerts.title1}
              <br />
              <span className="italic text-[#8a6a3f]">{t.concerts.titleItalic}</span>
            </h2>
          </div>
          <p className="max-w-sm text-[#5a4733]" style={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
            {t.concerts.text}
          </p>
        </Reveal>

        <div className="border-t border-[#6b4f37]/20">
          {concerts.map((c, i) => (
            <motion.div
              key={`${c.day}-${c.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="group grid items-center gap-5 border-b border-[#6b4f37]/20 py-8 md:grid-cols-12 md:gap-8"
            >
              {/* Date */}
              <div className="flex items-baseline gap-3 md:col-span-2 md:flex-col md:items-start md:gap-0">
                <span className="font-serif text-[#8a6a3f]" style={{ fontSize: "2.6rem", fontWeight: 600, lineHeight: 1 }}>
                  {c.day}
                </span>
                <span className="tracking-[0.15em] uppercase text-[#8a7762]" style={{ fontSize: "0.85rem" }}>
                  {c.month} {c.year}
                </span>
              </div>

              {/* Title & type */}
              <div className="md:col-span-5">
                <p className="tracking-[0.2em] uppercase text-[#a8814c]" style={{ fontSize: "0.72rem" }}>
                  {c.type}
                </p>
                <h3
                  className="mt-1 font-serif text-[#3a2e22] transition-colors group-hover:text-[#8a6a3f]"
                  style={{ fontSize: "1.6rem", fontWeight: 500, lineHeight: 1.2 }}
                >
                  {c.title}
                </h3>
              </div>

              {/* Venue */}
              <div className="flex items-start gap-2 text-[#5a4733] md:col-span-3" style={{ fontSize: "1.02rem" }}>
                <MapPin size={17} className="mt-1 shrink-0 text-[#8a6a3f]" />
                <span>
                  {c.venue}
                  <span className="block text-[#8a7762]" style={{ fontSize: "0.92rem" }}>
                    {c.city} · {c.time}
                  </span>
                </span>
              </div>

              {/* Action */}
              <div className="md:col-span-2 md:text-right">
                {c.soldOut ? (
                  <span className="inline-block rounded-full border border-[#6b4f37]/30 px-5 py-2 tracking-[0.06em] text-[#8a7762]" style={{ fontSize: "0.9rem" }}>
                    {t.concerts.soldOut}
                  </span>
                ) : (
                  <button
                    onClick={() => reserve(c)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#6b4f37] px-5 py-2 tracking-[0.06em] text-[#6b4f37] transition-all duration-300 hover:bg-[#6b4f37] hover:text-[#f8f2e7]"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {t.concerts.reserve}
                    <ArrowUpRight size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

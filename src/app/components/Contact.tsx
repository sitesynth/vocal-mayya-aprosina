import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Instagram, Youtube, Facebook } from "lucide-react";

const SOCIAL_LINKS = [
  { Icon: Instagram, href: "https://www.instagram.com/mayyadensteysi/", label: "Instagram" },
  { Icon: Youtube, href: "https://www.youtube.com/@Densteysi", label: "YouTube" },
  { Icon: Facebook, href: "https://www.facebook.com/maya.densteysi", label: "Facebook" },
];
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { useLanguage } from "../i18n/LanguageContext";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function Contact() {
  const { t } = useLanguage();
  const occasions = t.contact.occasions;
  const [occasion, setOccasion] = useState<string>(occasions[0]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  // Pre-select a subject when arriving from a CTA (e.g. /?subject=conducting#contact)
  useEffect(() => {
    const subject = new URLSearchParams(window.location.search).get("subject");
    if (subject === "conducting") {
      const match = occasions.find((o) => /dirig|conduct/i.test(o));
      if (match) setOccasion(match);
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, occasion, message }),
      });
      if (!res.ok) throw new Error("Failed to send");
      // Track the lead in GA4 (fetch submit doesn't trigger the auto form_submit event)
      window.gtag?.("event", "generate_lead", { occasion });
      toast.success(t.contact.toast);
      form.reset();
      setName("");
      setContact("");
      setMessage("");
      setOccasion(occasions[0]);
    } catch {
      toast.error(t.contact.toastError);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative bg-[#2c2118] py-28 text-[#f3ead9] lg:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <p className="mb-4 tracking-[0.35em] uppercase text-[#e3c89a]" style={{ fontSize: "0.78rem" }}>
            {t.contact.eyebrow}
          </p>
          <h2 className="font-serif text-[#f8f2e7]" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 500, lineHeight: 1.15 }}>
            {t.contact.title1} <span className="italic text-[#e3c89a]">{t.contact.titleItalic}</span> {t.contact.title2}
          </h2>
          <p className="mt-5 max-w-md text-[#e7dcc8]/80" style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            {t.contact.text}
          </p>

          <div className="mt-10 space-y-5">
            {[
              { icon: Phone, text: t.contact.phone },
              { icon: Mail, text: t.contact.email },
              { icon: MapPin, text: t.contact.location },
            ].map((c) => (
              <div key={c.text} className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f3ead9]/10 text-[#e3c89a]">
                  <c.icon size={19} />
                </span>
                <span style={{ fontSize: "1.08rem" }}>{c.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f3ead9]/20 text-[#e3c89a] transition-colors hover:border-[#c9a36a] hover:bg-[#c9a36a] hover:text-[#2a1f15]"
              >
                <Icon size={19} />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={submit}
            className="rounded-2xl border border-[#f3ead9]/12 bg-[#34281c]/60 p-8 backdrop-blur-sm"
          >
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-[#e7dcc8]/80" style={{ fontSize: "0.92rem" }}>
                  {t.contact.nameLabel}
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.contact.namePlaceholder}
                  className="w-full rounded-lg border border-[#f3ead9]/15 bg-[#2c2118]/60 px-4 py-3 text-[#f8f2e7] outline-none transition-colors placeholder:text-[#e7dcc8]/40 focus:border-[#c9a36a]"
                />
              </div>
              <div>
                <label className="mb-2 block text-[#e7dcc8]/80" style={{ fontSize: "0.92rem" }}>
                  {t.contact.contactLabel}
                </label>
                <input
                  required
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={t.contact.contactPlaceholder}
                  className="w-full rounded-lg border border-[#f3ead9]/15 bg-[#2c2118]/60 px-4 py-3 text-[#f8f2e7] outline-none transition-colors placeholder:text-[#e7dcc8]/40 focus:border-[#c9a36a]"
                />
              </div>
              <div>
                <label className="mb-2 block text-[#e7dcc8]/80" style={{ fontSize: "0.92rem" }}>
                  {t.contact.occasionLabel}
                </label>
                <div className="flex flex-wrap gap-2">
                  {occasions.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setOccasion(o)}
                      className={`min-h-[44px] rounded-full border px-4 py-2.5 transition-colors ${
                        occasion === o
                          ? "border-[#c9a36a] bg-[#c9a36a] text-[#2a1f15]"
                          : "border-[#f3ead9]/20 text-[#e7dcc8]/80 hover:border-[#c9a36a]"
                      }`}
                      style={{ fontSize: "0.9rem" }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-[#e7dcc8]/80" style={{ fontSize: "0.92rem" }}>
                  {t.contact.messageLabel}
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full resize-none rounded-lg border border-[#f3ead9]/15 bg-[#2c2118]/60 px-4 py-3 text-[#f8f2e7] outline-none transition-colors placeholder:text-[#e7dcc8]/40 focus:border-[#c9a36a]"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c9a36a] py-3.5 tracking-[0.08em] text-[#2a1f15] transition-all duration-300 hover:bg-[#dbb87f] hover:shadow-[0_15px_40px_-12px_rgba(201,163,106,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={18} />
                {sending ? t.contact.sending : t.contact.send}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-[#1f160e] py-10 text-center text-[#e7dcc8]/60">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-serif tracking-[0.2em] uppercase text-[#e3c89a]"
        style={{ fontSize: "1.1rem" }}
      >
        {t.name}
      </motion.p>
      <p className="mt-3" style={{ fontSize: "0.9rem" }}>
        © {new Date().getFullYear()} · {t.footer.tagline}
      </p>
      <a
        href="https://www.sitesynth.com/"
        target="_blank"
        rel="noopener"
        className="mt-6 inline-flex items-center gap-2 opacity-55 transition-opacity duration-300 hover:opacity-90"
        aria-label="Made by SiteSynth"
      >
        <span className="tracking-[0.12em] uppercase text-[#e7dcc8]/70" style={{ fontSize: "0.68rem" }}>
          {t.footer.madeBy}
        </span>
        <img src="/sitesynth-logo.svg" alt="SiteSynth" className="h-4 w-auto" />
      </a>
    </footer>
  );
}

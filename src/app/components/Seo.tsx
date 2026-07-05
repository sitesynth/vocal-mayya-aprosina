import { useEffect } from "react";
import { useLocation } from "react-router";

const SITE = "https://mayyaaprosina.com";

type Meta = { title: string; description: string };

// Per-route title + description. Keys are pathnames (no trailing slash).
const ROUTE_META: Record<string, Meta> = {
  "/": {
    title:
      "Zangles & Zangeres — Mayya Aprosina | Bornem, Puurs & Klein-Brabant",
    description:
      "Zangles en zangschool in Bornem, plus live zang voor bruiloften, uitvaarten en ceremonies in Bornem, Puurs, Willebroek, Temse, Mechelen, Dendermonde en Klein-Brabant.",
  },
  "/school": {
    title:
      "Zangschool & Zanglessen — Mayya Aprosina | Bornem & Klein-Brabant",
    description:
      "Een jaarprogramma dat individuele zanglessen combineert met ensemblegezang in Bornem. Voorinschrijving voor het nieuwe schooljaar is open — plaatsen zijn beperkt.",
  },
  "/conducting": {
    title:
      "Koordirigent & Ensembleleiding — Mayya Aprosina | Bornem & Maastricht",
    description:
      "Koordirigent en ensembleleider, opgeleid aan de Gnessin-academie en het Conservatorium Maastricht. Van partituur tot podium: samen luisteren, mengen en musiceren.",
  },
  "/projects": {
    title: "Muzikale Projecten — Mayya Aprosina | Klassiek, Etno & Jazz",
    description:
      "Persoonlijke muzikale projecten van Mayya Aprosina — waar klassieke stem, etnische klanken en jazz elkaar ontmoeten.",
  },
  "/bruiloften": {
    title: "Zangeres voor je bruiloft — Mayya Aprosina | Bornem & Klein-Brabant",
    description:
      "Live zangeres voor je huwelijk in Bornem, Puurs, Mechelen en Klein-Brabant — ceremonie, kerk en receptie. Klassiek, Ave Maria, jazz en jouw favoriete nummers.",
  },
  "/uitvaarten": {
    title: "Zangeres voor uitvaarten — Mayya Aprosina | Bornem & Klein-Brabant",
    description:
      "Fijngevoelige live zang voor uitvaarten en afscheidsplechtigheden in Bornem, Puurs, Mechelen en Klein-Brabant. Pie Jesu, Ave Maria, Amazing Grace en meer.",
  },
  "/ceremonies": {
    title: "Kerkmuziek & ceremoniezang — Mayya Aprosina | Bornem & Klein-Brabant",
    description:
      "Klassiek geschoolde zangeres voor kerkdiensten, doopsels, communies en ceremonies in Bornem, Puurs, Mechelen en Klein-Brabant. Solo of met orgel.",
  },
  "/concerten": {
    title: "Concert- & jazzzangeres — Mayya Aprosina | Bornem & Klein-Brabant",
    description:
      "Live zangeres voor concerten, recepties, bedrijfsevents en private feesten in Bornem, Mechelen, Antwerpen en Klein-Brabant. Klassiek, aria's en jazz.",
  },
};

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Keeps per-route <title>, description and canonical/og:url in sync as the SPA
 * navigates. Without this every route served the homepage canonical, so Google
 * treated /school, /conducting and /projects as duplicates of the homepage.
 */
export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
    const meta = ROUTE_META[path] ?? ROUTE_META["/"];
    const url = SITE + (path === "/" ? "/" : path);

    document.title = meta.title;
    setMeta('meta[name="description"]', "name", "description", meta.description);

    // Canonical
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);

    // Open Graph / Twitter
    setMeta('meta[property="og:title"]', "property", "og:title", meta.title);
    setMeta('meta[property="og:description"]', "property", "og:description", meta.description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", meta.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", meta.description);
  }, [pathname]);

  return null;
}

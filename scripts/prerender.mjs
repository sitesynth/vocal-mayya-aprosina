// Build-time prerender: renders each route to static HTML and injects the
// correct per-route <title>, description and canonical into the built template.
// Runs after `vite build` (client) and `vite build --ssr` (server).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const SITE = "https://mayyaaprosina.com";

// Keep in sync with src/app/components/Seo.tsx (ROUTE_META).
const META = {
  "/": {
    title: "Zangles & Zangeres — Mayya Aprosina | Bornem, Puurs & Klein-Brabant",
    description:
      "Zangles en zangschool in Bornem, plus live zang voor bruiloften, uitvaarten en ceremonies in Bornem, Puurs, Willebroek, Temse, Mechelen, Dendermonde en Klein-Brabant.",
  },
  "/school": {
    title: "Zangschool & Zanglessen — Mayya Aprosina | Bornem & Klein-Brabant",
    description:
      "Een jaarprogramma dat individuele zanglessen combineert met ensemblegezang in Bornem. Voorinschrijving voor het nieuwe schooljaar is open — plaatsen zijn beperkt.",
  },
  "/conducting": {
    title: "Koordirigent & Ensembleleiding — Mayya Aprosina | Bornem & Maastricht",
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

function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function injectHead(template, route, meta) {
  const url = SITE + (route === "/" ? "/" : route);
  let html = template;

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`);

  // meta description (name="description")
  html = html.replace(
    /(<meta\s+name="description"\s+content=")[\s\S]*?("\s*\/?>)/,
    `$1${escapeAttr(meta.description)}$2`,
  );

  // canonical
  html = html.replace(
    /(<link\s+rel="canonical"\s+href=")[\s\S]*?("\s*\/?>)/,
    `$1${url}$2`,
  );

  // og:url
  html = html.replace(
    /(<meta\s+property="og:url"\s+content=")[\s\S]*?("\s*\/?>)/,
    `$1${url}$2`,
  );

  // og:title / twitter:title
  html = html.replace(
    /(<meta\s+property="og:title"\s+content=")[\s\S]*?("\s*\/?>)/,
    `$1${escapeAttr(meta.title)}$2`,
  );
  html = html.replace(
    /(<meta\s+name="twitter:title"\s+content=")[\s\S]*?("\s*\/?>)/,
    `$1${escapeAttr(meta.title)}$2`,
  );

  return html;
}

async function run() {
  const { render } = await import(
    pathToFileURL(path.join(root, "server-build", "entry-server.js")).href
  );
  const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

  const routeList = Object.keys(META);
  for (const route of routeList) {
    const appHtml = await render(route);
    let doc = template.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    );
    doc = injectHead(doc, route, META[route]);

    const outPath =
      route === "/"
        ? path.join(distDir, "index.html")
        : path.join(distDir, route.slice(1), "index.html");
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, doc);
    console.log("prerendered", route, "→", path.relative(root, outPath));
  }

  // The SSR bundle is a build artefact, not for deployment.
  fs.rmSync(path.join(root, "server-build"), { recursive: true, force: true });
}

run().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});

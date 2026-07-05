import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";
import { routes } from "./app/routes";
import { LanguageProvider } from "./app/i18n/LanguageContext";

/**
 * Renders a route to a static HTML string for build-time prerendering.
 * Used by scripts/prerender.mjs — never shipped to the browser.
 */
export async function render(url: string): Promise<string> {
  const handler = createStaticHandler(routes);
  const context = await handler.query(new Request("http://localhost" + url));

  if (context instanceof Response) {
    throw new Error(`Unexpected redirect while prerendering ${url}`);
  }

  const router = createStaticRouter(handler.dataRoutes, context);

  return renderToString(
    <LanguageProvider>
      <StaticRouterProvider router={router} context={context} />
    </LanguageProvider>,
  );
}

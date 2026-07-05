import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./routes";
import { LanguageProvider } from "./i18n/LanguageContext";

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

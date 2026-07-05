import { type RouteObject } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { SchoolPage } from "./pages/SchoolPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ConductingPage } from "./pages/ConductingPage";
import { OccasionPage } from "./pages/OccasionPage";

// Shared route table — consumed by the browser router below and by the
// static prerender (scripts/prerender.mjs) so both stay in sync.
export const routes: RouteObject[] = [
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "school", Component: SchoolPage },
      { path: "projects", Component: ProjectsPage },
      { path: "conducting", Component: ConductingPage },
      { path: "bruiloften", element: <OccasionPage slug="weddings" /> },
      { path: "uitvaarten", element: <OccasionPage slug="funerals" /> },
      { path: "ceremonies", element: <OccasionPage slug="ceremonies" /> },
      { path: "concerten", element: <OccasionPage slug="concerts" /> },
      { path: "*", Component: Home },
    ],
  },
];

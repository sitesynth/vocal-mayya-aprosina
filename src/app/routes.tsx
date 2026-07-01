import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { SchoolPage } from "./pages/SchoolPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ConductingPage } from "./pages/ConductingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "school", Component: SchoolPage },
      { path: "projects", Component: ProjectsPage },
      { path: "conducting", Component: ConductingPage },
      { path: "*", Component: Home },
    ],
  },
]);

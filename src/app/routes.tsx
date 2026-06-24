import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { SchoolPage } from "./pages/SchoolPage";
import { ProjectsPage } from "./pages/ProjectsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "school", Component: SchoolPage },
      { path: "projects", Component: ProjectsPage },
      { path: "*", Component: Home },
    ],
  },
]);

import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { SchoolPage } from "./pages/SchoolPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "school", Component: SchoolPage },
      { path: "*", Component: Home },
    ],
  },
]);

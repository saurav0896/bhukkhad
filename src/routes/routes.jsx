import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CategoryView from "../components/CategoryPage/CategoryView";
import LandingPage from "../components/LandingPage/LandingPage";
import PreviewSection from "../components/CategoryPage/PreviewSection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/landingPage",
        element: <LandingPage />,
      },
      {
        path: "/categoryPage/:id",
        element: <CategoryView />,
      },
      {
        path: "/previewPage",
        element: <PreviewSection />,
      },
    ],
  },
]);

export default router;

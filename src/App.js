import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { StatisticsPage } from "./components/pages/StatisticsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "results",
    element: <StatisticsPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

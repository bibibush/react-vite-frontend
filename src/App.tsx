import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./mainPage";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

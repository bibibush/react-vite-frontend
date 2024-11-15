import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import MainPage from "./mainPage";
import axios from "axios";
import AuthenticatedLayout from "./mainPage/AuthenticatedLayout";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <AuthenticatedLayout>
          <Outlet />
        </AuthenticatedLayout>
      ),
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

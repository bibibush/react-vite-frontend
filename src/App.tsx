import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import axios from "axios";
import AuthenticatedLayout from "./AuthenticatedLayout";
import DashBoardPage from "./dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

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
          element: <DashBoardPage />,
        },
        {
          path: "/exchange",
          element: <></>,
        },
        {
          path: "/contact",
          element: <></>,
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

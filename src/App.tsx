import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import axios from "axios";
import AuthenticatedLayout from "./AuthenticatedLayout";
import DashBoardPage from "./dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "./components/ui/toaster";

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
          <Toaster />
        </AuthenticatedLayout>
      ),
      children: [
        {
          path: "/",
          element: <DashBoardPage />,
        },
      ],
    },
  ]);

  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;

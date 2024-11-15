import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div className="text-2xl font-bold">하이</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

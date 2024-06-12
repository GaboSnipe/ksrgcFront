import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login, Home } from "./pages"; // Подразумевается, что у вас есть компонент Home
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/app",
    element: <Home />,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;

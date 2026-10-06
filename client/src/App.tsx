import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/router";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

function App() {
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;

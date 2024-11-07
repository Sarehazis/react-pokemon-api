import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { LoginProvider } from "./context/LoginContext";
import store from "./redux/Store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LoginProvider>
          <AppRoutes />
        </LoginProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

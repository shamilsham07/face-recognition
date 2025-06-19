import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
// main.js or main.tsx
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from "react-router-dom";
import store from "./component4/redux/store.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

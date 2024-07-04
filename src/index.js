import React from "react";
import ReactDOM from "react-dom/client";
import "./css/my_reset.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { SocketContextProvider } from "./context/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <SocketContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketContextProvider>
  </Provider>
  // </React.StrictMode>
);

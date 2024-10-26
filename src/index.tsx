import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Chatbot from "./Chatbot";
import reportWebVitals from "./reportWebVitals";
import StockContextProvider from "./store/stockContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StockContextProvider>
      <Chatbot />
    </StockContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

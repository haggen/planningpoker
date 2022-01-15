import { StrictMode } from "react";
import { render } from "react-dom";

import reportWebVitals from "src/lib/reportWebVitals";

import "src/style/global.css";

import { App } from "src/components/App";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.info);

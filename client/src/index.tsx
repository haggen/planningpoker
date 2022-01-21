import { StrictMode } from "react";
import { render } from "react-dom";

import "src/style/global.css";

import { App } from "src/components/App";

import { extend } from "immutability-helper";

extend(
  "$filter",
  function (filter: (value: unknown) => boolean, value: unknown[]) {
    return value.filter(filter);
  }
);

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

import { StrictMode } from "react";
import { render } from "react-dom";

import "src/style/global.css";

import "src/lib/immutabilityHelpers";
import { App } from "src/components/App";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);

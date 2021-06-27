import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

import "./styles/global.scss";
import "./services/firebase";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./Components/App";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Quicksand", "sans-serif"]
  }
});

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

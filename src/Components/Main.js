import React from "react";
import { Router, Redirect } from "@reach/router"
import Pet from "./Pet";
import NotFound from "./NotFound";
import SendPet from "./SendPet";
import Privacy from "./Privacy";

const Main = () => (
  <main>
    <Router>
      <Pet path="/daily/:pet" />
      <SendPet path="/send" />
      <Privacy path="/privacy" />

      <Redirect
        noThrow
        from="/"
        to="/daily/dog"
      />

      <NotFound default />
    </Router>
  </main>
);

export default Main;

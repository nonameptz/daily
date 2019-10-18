import React, { Component } from "react";
import "./App.css";
import "./Privacy.css";

class Privacy extends Component {
  render() {
    return (
      <div className="main-content active-privacy">
        <header className="app-header">
          <h2 className="privacy-content-header">Privacy Policy</h2>
          <div className="privacy-data">
            <p>We don&apos;t store any of your data.</p>
            <p>
              We physically can&apos;t. We have nowhere to store it. We don&apos;t even
              have a server database to store it.
            </p>
            <p>
              So even if Justin Bieber asked nicely to see your data, we
              wouldn&apos;t have anything to show him.
            </p>
          </div>
          <img
            src="https://daily-pet.ru/gifs/privacy.gif"
            className="privacy-picture"
            alt="logo"
          />
        </header>
      </div>
    );
  }
}

export default Privacy;

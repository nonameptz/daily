import React, { Component } from "react";
import { withRouter } from "react-router";
import "./Header.css";

class Header extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(animal) {
    window.location = "/" + animal;
  }

  render() {
    let headerValues = {
      dog: {
        label: "dog",
        className: "dog-header",
        emoji: "🐶"
      },
      cat: {
        label: "cat",
        className: "cat-header",
        emoji: "🐱"
      },
      send: {
        label: "send",
        className: "send-header",
        emoji: "💜"
      },
      privacy: {
        label: "privacy",
        className: "privacy-header",
        emoji: "🗄️"
      }
    };
    switch (this.props.location.pathname) {
      case "/dog":
        headerValues["dog"]["className"] += " active";
        break;
      case "/cat":
        headerValues["cat"]["className"] += " active";
        break;
      case "/send":
        headerValues["send"]["className"] += " active";
        break;
      case "/privacy":
        headerValues["privacy"]["className"] += " active";
        break;
      default:
        break;
    }
    return (
      <header>
        <nav>
          <ul>
            {Object.keys(headerValues).map((key, index) => {
              let value = headerValues[key];
              return (
                <li
                  className={value.className}
                  key={index}
                  onClick={() => this.handleClick(value.label)}
                >
                  <span role="img" aria-label="value.label">
                    {value.emoji}
                  </span>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);

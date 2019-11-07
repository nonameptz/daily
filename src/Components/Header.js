import React, { Component } from "react";
import "./Header.css";
import { HEADER_VALUES } from "./Header.constant";

class Header extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(animal) {
    window.location = animal;
  }

  render() {
    let headerValues = {};
    switch (window.location.pathname) {
      case "/":
      case "/daily/dog":
        headerValues["dog"] = " active";
        break;
      case "/daily/cat":
        headerValues["cat"] = " active";
        break;
      case "/send":
        headerValues["send"] = " active";
        break;
      case "/privacy":
        headerValues["privacy"] = " active";
        break;
      default:
        break;
    }
    return (
      <header>
        <nav>
          <ul>
            {Object.keys(HEADER_VALUES).map((key, index) => {
              let value = HEADER_VALUES[key];
              return (
                <li
                  className={value.className + headerValues[key]}
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

export default Header;

import React, { Component, useContext } from "react";
import { navigate } from '@reach/router';
import "./Header.css";
import { HEADER_VALUES } from "./Header.constant";
import ThemeContext from './ThemeContext';

const Header = () => {
  const [theme, setTheme] = useContext(ThemeContext);

  const handleClick =(animal, path) => {
    setTheme(animal);
    navigate(path);
  };

  return (
    <header>
      <ThemeContext.Consumer>
        {([theme]) => (
        <nav>
          <ul>
            {Object.keys(HEADER_VALUES).map((key, index) => {
              let value = HEADER_VALUES[key];
              return (
                <li
                  className={value.className + (theme === key ? ' active' : '')}
                  key={index}
                  onClick={() => handleClick(key, value.label)}
                >
                  <span role="img" aria-label="value.label">
                    {value.emoji}
                  </span>
                </li>
              );
            })}
          </ul>
        </nav>
        )}
      </ThemeContext.Consumer>
    </header>
  );
};

export default Header;

import React, { FunctionComponent, useContext } from "react";
import { navigate } from '@reach/router';
import "./Header.css";
import { HEADER_VALUES } from "./Header.constant";
import ThemeContext from './ThemeContext';

const Header: FunctionComponent = () => {
  const [localTheme, setTheme] = useContext(ThemeContext);

  const handleClick =(animal: string, path: string) => {
    setTheme(animal);
    navigate(path);
  };

  return (
    <header>
      <ThemeContext.Consumer>
        {([theme]) => (
        <nav>
          <ul>
            {Object.keys(HEADER_VALUES).map((key: string, index: number) => {
              const value = HEADER_VALUES[key];
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

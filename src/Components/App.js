import React, { Component, useState } from "react";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import ThemeContext from "./ThemeContext";

const App = () => {
  const theme = useState(window.location.pathname.split('/').pop() || 'dog');
  return (
    <div className="main-app">
      <ThemeContext.Provider value={theme}>
        <Header />
        <Main />
      </ThemeContext.Provider>
    </div>
  );
};

export default App;

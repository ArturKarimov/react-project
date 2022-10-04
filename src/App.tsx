import React from "react";
import "./App.scss";

import AppHeader from "./components/app-header/app-header";
import CreatingBurger from "./components/creating-burger/creating-burger";

function App() {
  return (
      <div className="appWrapper">
        <AppHeader />
        <CreatingBurger />
      </div>

  );
}

export default App;

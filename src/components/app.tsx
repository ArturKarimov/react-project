import React from "react";
import "./app.module.scss";
import appStyle from "./app.module.scss";

import AppHeader from "./app-header/app-header";
import CreatingBurger from "./creating-burger/creating-burger";

function App() {
  return (
      <div className={appStyle.appWrapper}>
        <AppHeader />
        <CreatingBurger />
      </div>

  );
}

export default App;

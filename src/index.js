import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
// import AppTest from "./AppTest";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();

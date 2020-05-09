import React from "react";
// import ReactDOM from "react-dom";
import { render } from "react-snapshot";
import "./index.scss";
import App from "./App";

import * as serviceWorker from "./serviceWorker";

render(<App />, document.getElementById("root"));

serviceWorker.register();

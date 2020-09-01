import React, { StrictMode, Fragment } from "react";
import { render } from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

import "./style.scss";

render(
  <Fragment>
    <StrictMode>
      <App />
    </StrictMode>
  </Fragment>,
  document.getElementById("root")
);

serviceWorker.unregister();

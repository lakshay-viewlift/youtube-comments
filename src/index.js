import React, { StrictMode, Fragment } from "react";
import { render } from "react-dom";
import * as serviceWorker from "./serviceWorker";
import Login from "./views/Login";

import "./style.scss";

render(
  <Fragment>
    <StrictMode>
      <Login />
    </StrictMode>
  </Fragment>,
  document.getElementById("root")
);

serviceWorker.unregister();

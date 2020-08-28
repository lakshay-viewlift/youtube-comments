import React, { StrictMode, Fragment } from "react";
import { render } from "react-dom";
import * as serviceWorker from "./serviceWorker";

render(
  <Fragment>
    <StrictMode>
      <h1>Hello World</h1>
    </StrictMode>
  </Fragment>,
  document.getElementById("root")
);

serviceWorker.unregister();

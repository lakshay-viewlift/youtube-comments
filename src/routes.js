import Login from "./views/Login";
import Home from "./views/Home";
export default [
  {
    path: "/signin",
    view: Login,
    loggedIn: false,
    loggedOut: true,
  },
  {
    path: "/",
    view: Home,
    loggedIn: true,
    loggedOut: false,
  },
];

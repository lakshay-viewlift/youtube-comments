import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
// import { connect } from "react-redux";
import routes from "./routes";
const HISTORY = createBrowserHistory();

function App({ auth }) {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const UserPrivateRoute = ({ view: V, ...rest }) => {
  //   return (
  //     <Route {...rest} render={props => (isAuthenticated ? <V {...props} /> : <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />)} />
  //   );
  // };
  useEffect(() => {}, [auth]);
  return (
    <Router history={HISTORY}>
      <Switch>
        {routes.map(route => {
          //   if (route.loggedIn) return <UserPrivateRoute {...route} />;
          //   if (route.loggedOut) {
          const { path, view: V } = route;
          return <Route path={path} component={V} />;
          //   }
        })}
      </Switch>
    </Router>
  );
}

// function mapStateToProps(state) {
//   const { auth = null } = state;
//   return { auth };
// }

// export default connect(mapStateToProps, {})(App);
export default App;

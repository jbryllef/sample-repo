import React from "react";
// import { Layout } from "antd";
import { Route, Switch, Redirect } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { Login } from "./nonauth/login/";
import { ArticlesList } from "./auth/articles/";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/articles" component={ArticlesList} />

          <Redirect path="*" to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;

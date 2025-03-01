import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import CreateTask from "./create_task";
import DisplayTask from "./display_task";
import LogIn from "./login";
import SignUp from "./signup";
import NavBar from "./NavBar"
const AppRouter = () => {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/create-task" component={CreateTask} />
        <Route path="/tasks" component={DisplayTask} />
      </Switch>
    </Router>
  );
};

export default AppRouter;

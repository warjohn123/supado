import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Navbar } from "./components/navbar/navbar.component";
import { Sidebar } from "./components/sidebar/sidebar.component";
import { CompletedPage } from "./pages/completed/completed.page";
import { TodosPage } from "./pages/todos/todos.page";

export function AppRoutes() {
  return (
    <Router>
      <Sidebar></Sidebar>
      <div className="relative md:ml-64 bg-blueGray-100 min-h-screen">
        <Navbar />
        <div className="px-4 md:px-10 mx-auto w-full">
          <Switch>
            <Route path="/todos" exact component={TodosPage} />
            <Route path="/completed" exact component={CompletedPage} />
            <Redirect exact path="/" to="/todos" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

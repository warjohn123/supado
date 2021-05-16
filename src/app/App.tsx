import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthGuard } from './components/guards/auth.guard';

import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <AuthGuard></AuthGuard>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

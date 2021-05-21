import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthGuard } from "./components/guards/auth.guard";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-datepicker/dist/react-datepicker.css";

import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});
const link = from([
  errorLink,
  new HttpLink({
    uri: "http://supado.herokuapp.com/v1/graphql",
  }),
]);

const client = new ApolloClient({
  uri: "http://supado.herokuapp.com/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": "imfeelingproductivetoday",
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <AuthGuard></AuthGuard>
          </Route>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

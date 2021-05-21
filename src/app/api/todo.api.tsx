import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql, useMutation } from "@apollo/client";
import { Todo } from "../models/Todo";

const client = new ApolloClient({
  uri: "http://supado.herokuapp.com/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": "imfeelingproductivetoday",
  },
});

export class TodoApi {
  //   getTodos(): Promise<Todo[]> {
  //     return client
  //       .query({
  //         query: gql`
  //           {
  //             todos {
  //               id
  //               title
  //               completedDate
  //               dueDate
  //             }
  //           }
  //         `,
  //       })
  //       .then((response) => response.data.todos);
  //   }
  //   createTodo(): Promise<any> {
  //     return client
  //       .query({
  //         query: gql`
  //           mutation addTodo($title: String!, $dueDate: String!) {
  //             addTodo(title: $title, dueDate: $dueDate) {
  //               id
  //             }
  //           }
  //         `,
  //       })
  //       .then((response) => response.data);
  //   }
}

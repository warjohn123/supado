import { gql } from "@apollo/client";

export const CREATE_TODO_MUTATION = gql`
  mutation AddTodo($title: String!, $dueDate: date) {
    insert_todos(objects: { title: $title, dueDate: $dueDate }) {
      returning {
        id
      }
    }
  }
`;

export const UPDATE_TODO_MUTATION = gql`
  mutation CompleteTodo($id: Int!, $dueDate: date, $title: String!) {
    update_todos_by_pk(
      pk_columns: { id: $id }
      _set: { dueDate: $dueDate, title: $title }
    ) {
      id
    }
  }
`;

export const COMPLETE_TODO_MUTATION = gql`
  mutation CompleteTodo($id: Int!, $completedDate: date) {
    update_todos_by_pk(
      pk_columns: { id: $id }
      _set: { completedDate: $completedDate }
    ) {
      id
    }
  }
`;

export const DELETE_TODO_MUTATION = gql`
  mutation DeleteTodo($id: Int!) {
    delete_todos_by_pk(id: $id) {
      id
    }
  }
`;

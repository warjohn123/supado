import { gql } from "@apollo/client";

export const LOAD_UNCOMPLETED_TODOS = gql`
  query GetActiveTodos {
    todos(where: { completedDate: { _is_null: true } }) {
      id
      dueDate
      completedDate
      title
    }
  }
`;

export const LOAD_COMPLETED_TODOS = gql`
  query GetCompleteTodos {
    todos(where: { completedDate: { _is_null: false } }) {
      id
      dueDate
      completedDate
      title
    }
  }
`;

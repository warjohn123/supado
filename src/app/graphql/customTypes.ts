import { gql } from "@apollo/client";

module.exports = gql`
  scalar DateTime

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
`;

import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
    email: String!
  }

  type Query {
    # Fetch all users
    users: [User!]!
  }

  type Mutation {
    # Add a new user with name, age, and email
    addUser(name: String!, age: Int!, email: String!): User!
  }
`;

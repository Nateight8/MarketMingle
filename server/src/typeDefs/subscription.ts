import { gql } from "graphql-tag";

export const subscriptionsTypeDefs = gql`
  # Subscription Type
  type Subscription {
    id: ID!
    userId: ID!
    createdAt: String!
    updatedAt: String!
    plan: String!
    customerId: String!
  }

  # Query for fetching subscription details
  #   type Query {
  #     getUserSubscription(userId: ID!): Subscription
  #     listSubscriptions: [Subscription!]!
  #   }

  # Mutations related to subscriptions
  #   type Mutation {
  #     createSubscription(
  #       userId: ID!
  #       plan: String!
  #       customerId: String!
  #     ): Subscription

  #     updateSubscription(userId: ID!, plan: String!): Subscription

  #     deleteSubscription(id: ID!): Boolean
  #   }
`;

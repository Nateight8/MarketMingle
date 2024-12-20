import { gql } from "graphql-tag";

export const integrationsTypeDefs = gql`
  enum IntegrationName {
    INSTAGRAM
    # Add other possible integration names if applicable
  }

  type Integration {
    id: ID!
    name: IntegrationName!
    createdAt: String!
    userId: ID!
    token: String!
    expiresAt: String
    instagramId: String
    listener: Listener
  }

  # Queries related to integrations
  #   type Query {
  #     getUserIntegrations(userId: ID!): [Integration!]!
  #   }
`;

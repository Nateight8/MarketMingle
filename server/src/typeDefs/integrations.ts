import { gql } from "graphql-tag";

export const integrationsTypeDefs = gql`
  enum IntegrationName {
    INSTAGRAM
    # Add other possible integration names if applicable
  }

  type Integration {
    id: ID!
    name: String!
    createdAt: String!
    userId: ID!
    token: String!
    expiresAt: String
    instagramId: String
  }

  type InstagramAuthResponse {
    redirectUrl: String!
  }

  type Mutation {
    redirectToInstagramOAuth: InstagramAuthResponse!
    integrateWithInstagram(code: String!): Integration!
  }
`;

import { gql } from "graphql-tag";

export const keywords = gql`
  type Keyword {
    id: ID!
    automationId: String!
    word: String!
  }

  #   input CreateKeywordsInput {
  #     automationId: String!
  #     keywords: [String!]!
  #   }

  #   type CreateKeywordsPayload {
  #     success: Boolean!
  #     message: String!
  #   }

  #   type Mutation {
  #     createKeywords(input: CreateKeywordsInput!): CreateKeywordsPayload!
  #   }
`;

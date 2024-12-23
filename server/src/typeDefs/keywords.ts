import { gql } from "graphql-tag";

export const keywords = gql`
  type Keyword {
    id: ID!
    word: String!
    automationId: ID
  }

  input CreateKeywordsInput {
    automationId: String!
    keywords: [String!]!
  }

  type CreateKeywordsPayload {
    success: Boolean!
    message: String!
  }

  type Query {
    getKeywordsByAutomation(automationId: String!): [Keyword!]!
  }

  type Mutation {
    createKeywords(
      automationId: String!
      keywords: [String!]!
    ): CreateKeywordsPayload!
  }
`;

// TODO:DELETE KEYWORD

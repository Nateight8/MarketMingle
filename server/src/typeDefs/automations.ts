import { gql } from "graphql-tag";

const automationTypeDefs = gql`
  enum ListenerEnum {
    MESSAGE
    COMMENT
    DM
    # Add other listener types if necessary
  }

  type Listener {
    id: ID!
    automationId: ID!
    listener: ListenerEnum!
    prompt: String!
    commentReply: String
    dmCount: Int!
    commentCount: Int!
  }

  # Type definition for a Keyword
  type Keyword {
    id: ID!
    word: String!
    automationId: ID!
  }

  type Automation {
    id: ID!
    name: String
    createdAt: String
    active: Boolean
    userId: ID!
    user: User
    listeners: [Listener]
    keywords: [Keyword]
  }

  extend type Query {
    # getAutomation(id: ID!): Automation
    listAutomations: [Automation]
  }

  # extend type Mutation {
  #   createAutomation(name: String, active: Boolean, userId: ID!): Automation

  #   updateAutomation(id: ID!, name: String, active: Boolean): Automation

  #   deleteAutomation(id: ID!): Boolean
  # }
`;

export default automationTypeDefs;

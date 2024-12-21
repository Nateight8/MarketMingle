import { gql } from "graphql-tag";

const automationTypeDefs = gql`
  type Automation {
    id: ID!
    # name: String
    # createdAt: String
    # active: Boolean
    # userId: ID!
    # user: User
    # listeners: Listener
    keywords: [Keyword]
    trigger: Trigger
  }

  type AutomationResponse {
    id: ID
  }

  type Query {
    getAutomation(id: ID!): Automation
    listAutomations: [Automation]
  }

  type Mutation {
    createAutomation(
      name: String
      active: Boolean
      userId: ID!
    ): AutomationResponse

    # updateAutomation(id: ID!, name: String, active: Boolean): Automation

    # deleteAutomation(id: ID!): Boolean
  }
`;

export default automationTypeDefs;

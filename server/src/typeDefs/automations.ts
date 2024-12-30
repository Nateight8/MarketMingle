import { gql } from "graphql-tag";

const automationTypeDefs = gql`
  type Automation {
    id: ID!
    name: String
    # createdAt: String
    # active: Boolean
    # userId: ID!
    # user: User
    listener: Listener
    keywords: [Keyword]
    trigger: Trigger
  }

  type AutomationResponse {
    id: ID
  }

  type AutomationUpdateResponse {
    message: String
    success: Boolean
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

    updateAutomation(
      id: ID!
      name: String!
      active: Boolean
    ): AutomationUpdateResponse

    # deleteAutomation(id: ID!): Boolean
  }
`;

interface UpdateAutomationArgs {
  id: string;
  name: string;
  active: boolean;
}

export default automationTypeDefs;
export type { UpdateAutomationArgs };

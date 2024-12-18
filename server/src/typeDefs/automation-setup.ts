import { gql } from "graphql-tag";

const automationSetup = gql`
  enum ListenerEnum {
    MESSAGE
    SMARTAI # Add this line
    # Add other listener types if necessary
  }

  type CreateAutomationResponse {
    success: Boolean!
    message: String!
    listenerId: ID
  }
  #    type Query {
  #     getListener(id: ID!): Listener
  #     listListeners: [Listener]
  #   }

  type Mutation {
    createAutomationSetup(
      automationId: ID!
      listener: ListenerEnum!
      type: TriggerEnum!
      prompt: String
      commentReply: String
      dmCount: Int
      commentCount: Int
      keywords: [String]
    ): CreateAutomationResponse

    #   updateListener(
    #     id: ID!
    #     listener: ListenerEnum
    #     prompt: String
    #     commentReply: String
    #     dmCount: Int
    #     commentCount: Int
    #   ): Listener

    #   deleteListener(id: ID!): Boolean
  }
`;

export default automationSetup;

import { gql } from "graphql-tag";

export const listener = gql`
  type Listener {
    id: ID!
    automationId: ID!
    automation: Automation!
    listener: ListenerType!
    prompt: String
    commentReply: String
    dmCount: Int!
    commentCount: Int!
  }

  enum ListenerType {
    SMARTAI
    MESSAGE
  }

  type CreateListenerResponse {
    success: Boolean!
    message: String
  }

  type Mutation {
    createListener(
      automationId: ID!
      listener: ListenerType!
      prompt: String
      commentReply: String
    ): CreateListenerResponse
  }
`;

export default listener;

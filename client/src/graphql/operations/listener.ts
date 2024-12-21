import { gql } from "@apollo/client";

const listenerOperations = {
  Mutations: {
    createListener: gql`
      mutation CreateListener(
        $automationId: ID!
        $listener: ListenerType!
        $prompt: String
        $commentReply: String
      ) {
        createListener(
          automationId: $automationId
          listener: $listener
          prompt: $prompt
          commentReply: $commentReply
        ) {
          message
          success
        }
      }
    `,
  },
};

enum ListenerEnum {
  SMARTAI = "SMARTAI",
  MESSAGE = "MESSAGE",
}

interface Listener {
  automationId: string;
  listener: ListenerEnum;
  prompt?: string;
  commentReply?: string;
}

export default listenerOperations;
export type { Listener };

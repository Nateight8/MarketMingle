import { gql } from "@apollo/client";

const automationOperations = {
  Queries: {
    ListUserAutomations: gql`
      query ListAutomations {
        listAutomations {
          active
          createdAt
          name
          id
          keywords {
            word
            id
          }
          listeners {
            id
            prompt
          }
        }
      }
    `,

    GetAutomation: gql`
      query GetAutomation($getAutomationId: ID!) {
        getAutomation(id: $getAutomationId) {
          active
          createdAt
          keywords {
            id
            word
          }
          listeners {
            id
            listener
            prompt
            dmCount
            commentReply
            commentCount
            automationId
          }
          name
          user {
            image
            name
            integrations {
              createdAt
              expiresAt
              id
              name
            }
            subscriptions {
              plan
            }
          }
        }
      }
    `,
  },

  Mutations: {
    CreateAutomation: gql`
      mutation CreateAutomation($userId: ID!) {
        createAutomation(userId: $userId) {
          createdAt
          name
          id

          keywords {
            word
            id
          }

          listeners {
            commentCount
            commentReply
            dmCount
            listener
            prompt
          }
        }
      }
    `,
  },
};

interface AutomationProps {
  id: string;
  name: string;
  active: boolean;
  createdAt: Date;
}

interface ListUserAutomations {
  listAutomations: AutomationProps[];
}

interface GetAutomationName {
  getAutomationName: {
    name: string;
  };
}

interface GetAutomation {
  name: string;
  acrive: boolean;
  createdAt: Date;

  keywords: {
    id: string;
    word: string;
  };

  listeners: {
    commentCount: number;
    commentReply: number;
    dmCount: number;
    prompt: string;
  };
}

export default automationOperations;
export type { ListUserAutomations, AutomationProps };

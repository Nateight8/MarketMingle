import { gql } from "@apollo/client";
import { Trigger } from "./trigger";
import { keyword } from "./keywords";

const automationOperations = {
  Queries: {
    ListUserAutomations: gql`
      query ListAutomations {
        listAutomations {
          id
        }
      }
    `,

    GetAutomation: gql`
      query GetAutomation($getAutomationId: ID!) {
        getAutomation(id: $getAutomationId) {
          trigger {
            type
            id
          }
          keywords {
            id
            word
          }
        }
      }
    `,
  },

  Mutations: {
    CreateAutomation: gql`
      mutation CreateAutomation($userId: ID!) {
        createAutomation(userId: $userId) {
          id
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

interface GetAutomation {
  getAutomation: {
    trigger: Trigger;
    keywords: keyword[];
  };
}

export default automationOperations;
export type { ListUserAutomations, AutomationProps, GetAutomation };

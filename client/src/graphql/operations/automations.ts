import { gql } from "@apollo/client";

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

export default automationOperations;
export type { ListUserAutomations, AutomationProps };

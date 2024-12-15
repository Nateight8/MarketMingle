import { gql } from "@apollo/client";

const automationOperations = {
  Querries: {
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

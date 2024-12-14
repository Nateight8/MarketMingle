import { gql } from "@apollo/client";

const userOperations = {
  Querries: {
    createPost: gql`
      query GetLoggedInUser {
        getLoggedInUser {
          status
          user {
            name
            email
            integrations {
              name
              createdAt
            }
            subscriptions {
              plan
            }
          }
        }
      }
    `,
  },
};

interface Integrations {
  name: string;
  createdAt: Date;
}

interface GetLoggedInUser {
  getLoggedInUser: {
    status: number;
    user: {
      name: string;
      email: string;
      integrations: Integrations[];
      subscriptions: {
        plan: string;
      };
    };
  };
}

export type { GetLoggedInUser };
export default userOperations;

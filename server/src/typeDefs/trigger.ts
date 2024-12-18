import { gql } from "graphql-tag";

const trigger = gql`
  enum TriggerEnum {
    MESSAGE
    COMMENT
  }

  type Trigger {
    id: ID!
    type: TriggerEnum!
    automationId: ID!
  }
`;

export default trigger;

import { gql } from "graphql-tag";

const trigger = gql`
  enum TriggerEnum {
    DM
    COMMENT
  }

  type Trigger {
    id: ID!
    type: TriggerEnum!
    automationId: ID!
  }

  type CreateTriggerResponse {
    success: Boolean
    message: String
  }

  type Mutation {
    createTrigger(type: TriggerEnum, automationId: ID!): CreateTriggerResponse
  }
`;

export default trigger;

// type Trigger {
//   id: ID!
//   type: String! # e.g., "webhook", "schedule", "event"
//   condition: String # e.g., "on new order", "every day at 9 AM"
//   payload: JSON # Additional data associated with the trigger
// }

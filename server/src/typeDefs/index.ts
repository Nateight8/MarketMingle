// Define the GraphQL schema

import automationTypeDefs from "./automations.js";
import { integrationsTypeDefs } from "./integrations.js";
import postTypeDefs from "./post.js";
import { subscriptionsTypeDefs } from "./subscription.js";
import { userTypeDefs } from "./user.js";
import automationSetup from "./automation-setup.js";
import trigger from "./trigger.js";

const typeDefs = [
  postTypeDefs,
  userTypeDefs,
  integrationsTypeDefs,
  subscriptionsTypeDefs,
  automationTypeDefs,
  automationSetup,
  trigger,
];

export default typeDefs;

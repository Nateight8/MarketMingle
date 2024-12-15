// Define the GraphQL schema

import automationTypeDefs from "./automations.js";
import { integrationsTypeDefs } from "./integrations.js";
import postTypeDefs from "./post.js";
import { subscriptionsTypeDefs } from "./subscription.js";
import { userTypeDefs } from "./user.js";

const typeDefs = [
  postTypeDefs,
  userTypeDefs,
  integrationsTypeDefs,
  subscriptionsTypeDefs,
  automationTypeDefs,
];

export default typeDefs;

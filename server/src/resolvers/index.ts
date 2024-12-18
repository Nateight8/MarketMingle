import merge from "lodash.merge";
import postResolvers from "./post.js";
import userResolvers from "./user.js";
import automationResolvers from "./automations.js";
import createAutomationSetup from "./automation-setup.js";

// import listenersResolvers from "./listeners.js";

const resolvers = merge(
  {},
  postResolvers,
  userResolvers,
  automationResolvers,
  createAutomationSetup
);

export default resolvers;

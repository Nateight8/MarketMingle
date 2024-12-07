import merge from "lodash.merge";
import postResolvers from "./post.js";
import { userResolver } from "./user.js";
const resolvers = merge({}, postResolvers, userResolver);

export default resolvers;

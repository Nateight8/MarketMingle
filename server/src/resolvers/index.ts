import merge from "lodash.merge";
import postResolvers from "./post.js";
import userResolvers from "./user.js";
const resolvers = merge({}, postResolvers, userResolvers);

export default resolvers;

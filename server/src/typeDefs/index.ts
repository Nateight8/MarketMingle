// Define the GraphQL schema

import postTypeDefs from "./post.js";
import { userTypeDefs } from "./user.js";

const typeDefs = [postTypeDefs, userTypeDefs];

export default typeDefs;

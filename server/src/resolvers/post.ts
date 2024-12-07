interface createPostInput {
  title: string;
  username: string;
}

const postResolvers = {
  Mutation: {
    createPost: async (_parent: any, args: createPostInput, ctx: {}) => {
      console.log("here is context:", args);
    },
  },
  Query: {},
};

export default postResolvers;

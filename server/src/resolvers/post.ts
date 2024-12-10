interface createPostInput {
  title: string;
  username: string;
}

const postResolvers = {
  Mutation: {
    createPost: async (_parent: any, args: createPostInput, ctx: {}) => {
      console.log("here is args:", args);
    },
  },
  Query: {},
};

export default postResolvers;

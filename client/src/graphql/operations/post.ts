import { gql } from "@apollo/client";

const postOperations = {
  Mutations: {
    createPost: gql`
      mutation CreatePostMutation($title: String, $username: String) {
        createPost(title: $title, username: $username) {
          id
          title
          username
        }
      }
    `,
  },
};

export default postOperations;

import { gql } from "graphql-tag";

const postTypeDefs = gql`
  enum MediaType {
    IMAGE
    CAROUSEL_ALBUM
    TEXT
  }

  type Post {
    id: ID!
    postid: String!
    caption: String
    media: String!
    mediaType: MediaType!
    automationId: ID!
  }

  type Query {
    getSocialPosts: [Post!]!
  }
`;

export default postTypeDefs;

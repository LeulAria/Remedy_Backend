import { gql } from "apollo-server-core";

export default gql`
  extend type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }

  extend type Mutation {
    createPost(payload: PostPayload!): Post!
    updatePost(payload: PostUpdatePayload!): Post!
    deletePost(payload: PostDeletePayload!): String!
    likePost(payload: LikePostPayload): String!
  }

  type Post {
    id: String!
    user: User!
    post: String!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    updatedAt: String!
  }

  input PostPayload {
    body: String!
  }

  input PostUpdatePayload {
    postId: String!
    body: String!
  }

  input PostDeletePayload {
    postId: String!
  }

  input LikePostPayload {
    postId: String!
  }
`;

export interface IPostPayload {
  body: string;
}

export interface IPostUpdatePayload {
  postId: string;
  body: string;
}

export interface IPostDeletePayload {
  postId: string;
}

export interface ILikePostPayload {
  postId: string;
}

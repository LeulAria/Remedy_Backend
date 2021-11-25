import { gql } from "apollo-server-core";

export default gql`
  extend type Query {
    getUser: String
  }

  extend type Mutation {
    login(userCredentials: UserLoinCredentials): User!
    register(userCredentials: UserRegisterCredentials): User!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    updatedAt: String!
  }

  input UserLoinCredentials {
    username: String
    email: String
    password: String!
  }

  input UserRegisterCredentials {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
`;

export interface IUserRegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserLoginPayload {
  username?: string;
  email?: string;
  password: string;
}

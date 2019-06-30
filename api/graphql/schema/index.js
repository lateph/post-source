const { buildSchema } = require('graphql');

module.exports = buildSchema(`
scalar DateTime

input PaginationArg {
  skip: Int = 0
  limit: Int = 0
}


type Source {
  _id: ID!
  title: String!
  description: String!
  category: String!
  type: Type!
  tags: [String!]
  creator: User!
  createdAt: DateTime
  updatedAt: DateTime
}

input SourceInput {
  title: String!
  description: String!
  category: String!
  type: ID!
  tags: [String!]
}

input SourceInputEdit {
  title: String!
  description: String!
  category: String!
  type: ID!
  tags: [String!]
}

type Type {
  _id: ID!
  name: String!
  desc: String
  createdAt: DateTime
  updatedAt: DateTime
}
input TypeInput {
  name: String!
  desc: String
}
input TypeInputEdit {
  name: String
  desc: String
}

type User {
  _id: ID
  email: String
  password: String
}
type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}
input UserInput {
  email: String!
  password: String!
}
type CreateUser{
  errors: User,
  user: User,
  auth: AuthData
}

type RootQuery {
    types(pagination: PaginationArg= {}): [Type!]!
    type(_id: ID!): Type!
    events: [Source!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createType(input: TypeInput): Type
    updateType(_id: ID!, input: TypeInputEdit): Type
    deleteType(_id: ID!): Type

    createSource(input: SourceInput): Source
    updateSource(_id: ID!, input: SourceInputEdit): Source
    deleteSource(_id: ID!): Source

    createUser(userInput: UserInput): CreateUser
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);

const { buildSchema } = require('graphql');

module.exports = buildSchema(`
scalar DateTime

input PaginationArg {
  skip: Int = 0
  limit: Int = 0
}


type Source {
  _id: ID
  title: String
  shortDesc: String
  desc: String
  category: String
  type: Type
  tags: [String!]
  creator: User
  createdAt: DateTime
  updatedAt: DateTime
}

input SourceInput {
  title: String
  shortDesc: String
  desc: String
  category: String
  type: String
  tags: [String!]
}

input SourceInputEdit {
  title: String
  shortDesc: String
  desc: String
  category: String
  type: String
  tags: [String!]
}

type SourceError{
  title: [String]
  shortDesc: [String]
  desc: [String]
  category: [String]
  type: [String]
  tags: [String]
  creator: [String]
}

type CreateSource{
  errors: SourceError,
  source: Source,
}

type Type {
  _id: ID!
  name: String!
  desc: String
  total: Int
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

type Tag {
  _id: ID!
  name: String!
  total: Int
  createdAt: DateTime
  updatedAt: DateTime
}
input TagInput {
  name: String!
}
input TagInputEdit {
  name: String
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
    tags(pagination: PaginationArg= {}): [Tag!]!

    type(_id: ID!): Type!
    events: [Source!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createType(input: TypeInput): Type
    updateType(_id: ID!, input: TypeInputEdit): Type
    deleteType(_id: ID!): Type

    createTag(input: TagInput): Tag
    updateTag(_id: ID!, input: TagInputEdit): Tag
    deleteTag(_id: ID!): Tag

    createSource(input: SourceInput): CreateSource
    updateSource(_id: ID!, input: SourceInputEdit): Source
    deleteSource(_id: ID!): Source

    createUser(userInput: UserInput): CreateUser
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);

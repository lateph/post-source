const { buildSchema } = require('graphql');

module.exports = buildSchema(`
scalar DateTime

input PaginationArg {
  skip: Int = 0
  limit: Int = 0
  sort: String = ""
}


type Source {
  _id: ID
  title: String
  shortDesc: String
  desc: String
  slug: String
  file: String
  thumb: String
  fileUrl: String
  thumbUrl: String
  category: String
  type: Type
  tags: [Tag]
  creator: User
  createdAt: DateTime
  updatedAt: DateTime
}

input SourceFilter {
  type: String
  category: String
  creator: String
  tags: [String]
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

type UserError{
  firstName: [String]
  lastName: [String]
  email: [String]
  password: [String]
}
type User {
  _id: ID
  firstName: String
  lastName: String
  email: String
  password: String
}

input UserFilter {
  firstName: String
}

type AuthData {
  userId: ID
  token: String
  tokenExpiration: Int
}
input UserInput {
  firstName: String
  lastName: String
  email: String
  password: String
}
type CreateUser{
  errors: UserError,
  user: User,
  auth: AuthData
}

type RootQuery {
    types(pagination: PaginationArg= {}): [Type!]!
    sources(pagination: PaginationArg= {}, filter: SourceFilter={}): [Source!]!
    countSources(filter: SourceFilter={}): Int

    user(_id: ID!): User
    users(pagination: PaginationArg= {}, filter: UserFilter={}): [User!]!
    countUsers(filter: UserFilter={}): Int
    
    tags(pagination: PaginationArg= {}): [Tag!]!

    type(_id: ID!): Type!
    sourceSlug(slug: String!): Source
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
    updateUser(userInput: UserInput): CreateUser
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);

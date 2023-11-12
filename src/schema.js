const { gql } = require('apollo-server')

const typeDefs = gql`

  enum Enum_RoleName {
    Admin
    Manager
    User
  }

  type Role {
    id: ID!
    name: Enum_RoleName!
    description: String
    createdAt: String!
  }

  type User {
    id: ID!
    email: String!
    emailVerified: String
    termsAndConditionsAccepted: String
    name: String
    image: String
    position: String
    createdAt: String
    updateAt: String
    roled: Role
  }

  type Session {
    id: ID!
    sessionToken: String!
    expiresAt: String!
    createdAt: String!
    userId: User!
  }

  type UserMonitoring {
    id: ID!
    usage: Int!
    description: String!
    userId: User
    createAt: String!
  }

  type Country {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  type _CountryToUser {
    id: ID!
    A: Country!
    B: User!
  }

  type Query {
    allUsers: [User!]!
  }
`

module.exports = {
  typeDefs,
}

const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
  }

  type Book {
    _id: ID
    authors: String
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  input BookInput{ 
        authors: [String]
        description: String! 
        bookId: String!
        image: String
        link: String
        title: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    Me(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    logIn(email: String!, password: String!): Auth  
    saveBook(bookData: BookInput!): User
    removeBook(userId: ID!, bookId: ID!): User
  }
`;

module.exports = typeDefs;

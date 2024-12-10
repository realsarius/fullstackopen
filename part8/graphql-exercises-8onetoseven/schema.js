const typeDefs = `
    type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
    }
    type Token {
      value: String!
    }

      type Author {
        id: ID!
        name: String!
        username: String!
        born: Int
        bookCount: Int!
      }
    
      type Query {
        dummy: Int
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]!
        allAuthors: [Author]!
        me: Author
      }
  
    type Mutation {
      addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
      ): Book!
      editAuthor(name: String!, setBornTo: Int!, setUsername: String!): Author
      addAuthor(name: String!, born: Int, username: String!): Author!
      login(
        username: String!
        password: String!
      ): Token
    }
    
    type Subscription {
      bookAdded: Book!
    }    
`;

module.exports = typeDefs;
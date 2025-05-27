import express from 'express';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  input CreateBookInput {
    title: String!
    author: String!
  }

  input UpdateBookInput {
    title: String
    author: String
  }

  type Query {
    getBooks: [Book!]!
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book
    updateBook(id: ID!, input: UpdateBookInput!): Book
    removeBook(id: ID!): Boolean
  }
`);

const books = [
  { id: "1", title: "1984", author: "George Orwell" },
];

const root = {
  getBooks: () => books,
  createBook: ({ input }) => {
    const book = { id: String(Date.now()), ...input };
    books.push(book);
    return book;
  },
  updateBook: ({ id, input }) => {
    const book = books.find(b => b.id === id);
    if (!book) return null;
    Object.assign(book, input);
    return book;
  },
  removeBook: ({ id }) => {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
  },
};

const app = express();
app.use(cors());
app.use(express.json());
app.use('/graphql', createHandler({ schema, rootValue: root }));

app.listen(3001, () => console.log('GraphQL server on http://localhost:3001/graphql'));

# Nest-GraphQL
##  Backend Setup (NestJS + GraphQL)
### Install dependencies
cd backend\
npm install
## ▶️ Run the server
npm run start:dev\
Your NestJS GraphQL server should now be running at:\
📍 http://localhost:3000/graphql
## Frontend Setup
cd frontend\
npx live-server\
Your frontend will be available at:\
📍 http://localhost:3001/
## 🌐 API Overview
### 📚 Books
query getBooks: Fetch all books\
mutation createBook(input: CreateBookInput!): Add a new book\
mutation updateBook(id: ID!, input: UpdateBookInput!): Update a book\
mutation removeBook(id: Int!): Delete a book
### 🎬 Movies
query movies: Fetch all movies\
mutation createMovie(input: CreateMovieInput!): Add a new movie\
mutation updateMovie(id: ID!, input: UpdateMovieInput!): Update a movie\
mutation removeMovie(id: Int!): Delete a movie
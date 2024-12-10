import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            bookCount
            born
            name
            id
        }
    }
`;

export const ALL_BOOKS = gql`
    query AllBooks($genre: String) {
        allBooks(genre: $genre) {
            id
            title
            published
            genres
            author {
                name
                username
                id
                born
                bookCount
            }
        }
    }
`;

export const ADD_BOOK = gql`
    mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            genres
            author {
                id
                name
            }
            published
            title
        }
    }
`;


export const EDIT_AUTHOR = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`;

export const LOGIN = gql`
    mutation Mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;
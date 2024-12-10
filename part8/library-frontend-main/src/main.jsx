import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ApolloClient, ApolloProvider, createHttpLink, gql, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('phonenumbers-user-token');
    return { headers: { ...headers, authorization: token ? `Bearer ${token}` : null } };
});

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

const query = gql`
    query {
        allAuthors {
            bookCount
            born
            name
            id
        }
    }
`;

client.query({ query })
    .then((response) => {
        console.log(response.data);
    });

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
);

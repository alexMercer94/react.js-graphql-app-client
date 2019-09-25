import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Header from './components/Header';
import Clients from './components/Clients';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    onError: ({ networkError, graphQLErrors }) => {
        console.log('grpahQLErrors', graphQLErrors);
        console.log('grpahQLErrors', networkError);
    }
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Header></Header>
            <div className="container">
                <Clients></Clients>
            </div>
        </ApolloProvider>
    );
}

export default App;

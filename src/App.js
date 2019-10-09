import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import Header from './components/Header';
import Clients from './components/Clients';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewClient from './components/NewClient';
import EditClient from './components/EditClient';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache({
        addTypename: false
    }),
    onError: ({ networkError, graphQLErrors }) => {
        console.log('grpahQLErrors', graphQLErrors);
        console.log('grpahQLErrors', networkError);
    }
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Fragment>
                    <Header></Header>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Clients}></Route>
                            <Route exac path="/client/edit/:id" component={EditClient}></Route>
                            <Route exac path="/client/new" component={NewClient}></Route>
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        </ApolloProvider>
    );
}

export default App;

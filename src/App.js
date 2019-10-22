import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import Header from './components/Layout/Header';
import Clients from './components/Clients/Clients';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NewClient from './components/Clients/NewClient';
import EditClient from './components/Clients/EditClient';
import NewProduct from './components/Products/NewProduct';
import Products from './components/Products/Products';
import EditProduct from './components/Products/EditProduct';

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
                            <Route exact path="/clients" component={Clients}></Route>
                            <Route exac path="/clients/edit/:id" component={EditClient}></Route>
                            <Route exac path="/clients/new" component={NewClient}></Route>
                            <Route exac path="/products/edit/:id" component={EditProduct}></Route>
                            <Route exac path="/products/new" component={NewProduct}></Route>
                            <Route exac path="/products" component={Products}></Route>
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        </ApolloProvider>
    );
}

export default App;

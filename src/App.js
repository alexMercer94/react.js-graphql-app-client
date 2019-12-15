import React, { Fragment } from 'react';

import Header from './components/Layout/Header';
import Clients from './components/Clients/Clients';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NewClient from './components/Clients/NewClient';
import EditClient from './components/Clients/EditClient';
import NewProduct from './components/Products/NewProduct';
import Products from './components/Products/Products';
import EditProduct from './components/Products/EditProduct';
import NewOrder from './components/Orders/NewOrder';
import ClientOrders from './components/Orders/ClientOrders';
import Panel from './components/Panel/Panel';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Session from './components/Session';

const App = ({ refetch, session }) => {
    const { getUser } = session;
    const message = getUser ? getUser.name : <Redirect to="/login" />;
    return (
        <Router>
            <Fragment>
                <Header session={session}></Header>
                <div className="container">
                    <p className="text-right">
                        <strong>Bienvenido: </strong>
                        {message}
                    </p>
                    <Switch>
                        <Route exact path="/clients" render={() => <Clients session={session}></Clients>}></Route>
                        <Route exac path="/clients/edit/:id" component={EditClient}></Route>
                        <Route
                            exac
                            path="/clients/new"
                            render={() => <NewClient session={session}></NewClient>}
                        ></Route>
                        <Route exac path="/products/edit/:id" component={EditProduct}></Route>
                        <Route exac path="/products/new" component={NewProduct}></Route>
                        <Route exac path="/products" component={Products}></Route>
                        <Route
                            exac
                            path="/orders/new/:id"
                            render={() => <NewOrder session={session}></NewOrder>}
                        ></Route>
                        <Route exac path="/orders/:id" component={ClientOrders}></Route>
                        <Route exac path="/panel" component={Panel}></Route>
                        <Route exac path="/register" render={() => <Register session={session}></Register>}></Route>
                        <Route exac path="/login" render={() => <Login refetch={refetch}></Login>}></Route>
                    </Switch>
                </div>
            </Fragment>
        </Router>
    );
};

const RootSession = Session(App);
export { RootSession };

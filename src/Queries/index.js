import gql from 'graphql-tag';

export const CLIENTS_QUERY = gql`
    query getClients($limit: Int, $offset: Int, $seller: String) {
        getClients(limit: $limit, offset: $offset, seller: $seller) {
            id
            name
            surname
            company
        }
        totalClients(seller: $seller)
    }
`;

export const CLIENT_QUERY = gql`
    query consultClient($id: ID) {
        getClient(id: $id) {
            id
            name
            surname
            company
            emails {
                email
            }
            age
            type
        }
    }
`;

export const GET_PRODUCTS = gql`
    query getProducts($limit: Int, $offset: Int, $stock: Boolean) {
        getProducts(limit: $limit, offset: $offset, stock: $stock) {
            id
            name
            price
            stock
        }
        totalProducts
    }
`;

export const GET_PRODUCT = gql`
    query getProduct($id: ID!) {
        getProduct(id: $id) {
            name
            stock
            price
        }
    }
`;

// Orders
export const GET_ORDERS = gql`
    query getOrders($client: ID) {
        getOrders(client: $client) {
            id
            total
            date
            state
            order {
                id
                amount
            }
        }
    }
`;

// Charts
export const TOP_CLIENTS = gql`
    query topClients {
        topClients {
            total
            client {
                name
            }
        }
    }
`;

export const TOP_SELLERS = gql`
    query topSellers {
        topSellers {
            total
            seller {
                name
            }
        }
    }
`;

// Users
export const ACTUAL_USER = gql`
    query getUser {
        getUser {
            id
            user
            name
            role
        }
    }
`;

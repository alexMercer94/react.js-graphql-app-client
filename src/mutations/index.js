import gql from 'graphql-tag';

export const NEW_CLIENT = gql`
    mutation createClient($input: ClientInput) {
        createClient(input: $input) {
            id
            name
            surname
        }
    }
`;

export const UPDATE_CLIENT = gql`
    mutation updateClient($input: ClientInput) {
        updateClient(input: $input) {
            id
            name
            surname
            age
            company
            emails {
                email
            }
            type
        }
    }
`;

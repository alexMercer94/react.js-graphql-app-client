import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { NEW_USER } from '../../mutations';
import Error from '../Alerts/Error';
import { withRouter, Redirect } from 'react-router-dom';

const initialState = {
    user: '',
    password: '',
    repeatPassword: '',
    name: '',
    role: ''
};

class Register extends Component {
    state = {
        ...initialState
    };

    /**
     * Update state with form's data
     */
    updateState = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    /**
     * Validate form's data
     */
    validateForm = () => {
        const { user, password, repeatPassword, name, role } = this.state;
        const noValid = !user || !password || !name || !role || password !== repeatPassword;

        return noValid;
    };

    /**
     * Create new user in BD
     */
    createNewUser = (e, createUser) => {
        e.preventDefault();

        createUser().then(data => {
            this.clearState();
        });
    };

    /**
     * Clear state and form and redirect to Login component
     */
    clearState = () => {
        this.setState({
            ...initialState
        });

        this.props.history.push('/login');
    };

    render() {
        const { user, password, repeatPassword, name, role } = this.state;

        const userRole = this.props.session.getUser.role;
        const redirection = userRole !== 'ADMINISTRATOR' ? <Redirect to="/clients"></Redirect> : '';

        return (
            <Fragment>
                {redirection}
                <h1 className="text-center mb-5">Nuevo usuario</h1>
                <div className="row  justify-content-center">
                    <Mutation mutation={NEW_USER} variables={{ user, name, password, role }}>
                        {(createUser, { loading, error, data }) => {
                            return (
                                <form onSubmit={e => this.createNewUser(e, createUser)} className="col-md-8">
                                    {error && <Error error={error}></Error>}
                                    <div className="form-group">
                                        <label>Usuario</label>
                                        <input
                                            type="text"
                                            name="user"
                                            className="form-control"
                                            placeholder="Nombre Usuario"
                                            onChange={this.updateState}
                                            value={user}
                                        />
                                        <small className="form-text text-muted">
                                            (Sin espacios y sin carácteres especiales)
                                        </small>
                                    </div>
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Nombre Completo"
                                            onChange={this.updateState}
                                            value={name}
                                        />
                                        <small className="form-text text-muted">(Agregar el Nombre y Apellidos)</small>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6">
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Password"
                                                onChange={this.updateState}
                                                value={password}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Repetir Password</label>
                                            <input
                                                type="password"
                                                name="repeatPassword"
                                                className="form-control"
                                                placeholder="Repetir Password"
                                                onChange={this.updateState}
                                                value={repeatPassword}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Rol: </label>
                                        <select
                                            className="form-control"
                                            value={role}
                                            name="role"
                                            onChange={this.updateState}
                                        >
                                            <option value="">Eligir...</option>
                                            <option value="ADMINISTRATOR">Administrador</option>
                                            <option value="SELLER">Vendedor</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-success float-right"
                                        disabled={loading || this.validateForm()}
                                    >
                                        Crear Usuario
                                    </button>
                                </form>
                            );
                        }}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(Register);

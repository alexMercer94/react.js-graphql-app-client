import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Error from '../Alerts/Error';
import { Mutation } from 'react-apollo';
import { AUTHENTICATE_USER } from '../../mutations';

const initialState = {
    user: '',
    password: ''
};

class Login extends Component {
    state = {
        ...initialState
    };

    actualizarState = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    };

    limpiarState = () => {
        this.setState({ ...initialState });
    };

    iniciarSesion = (e, authenticateUser) => {
        e.preventDefault();

        authenticateUser().then(async ({ data }) => {
            localStorage.setItem('token', data.authenticateUser.token);

            // Ejcutar query una ves que se haya iniciado sesión
            await this.props.refetch();

            // clear state
            this.limpiarState();

            //Redireccionar
            setTimeout(() => {
                this.props.history.push('/panel');
            }, 1000);
        });
    };

    validarForm = () => {
        const { user, password } = this.state;
        const noValido = !user || !password;

        return noValido;
    };
    render() {
        const { user, password } = this.state;

        return (
            <Fragment>
                <h1 className="text-center mb-5">Iniciar Sesión</h1>
                <div className="row  justify-content-center">
                    <Mutation mutation={AUTHENTICATE_USER} variables={{ user, password }}>
                        {(authenticateUser, { loading, error, data }) => {
                            return (
                                <form onSubmit={e => this.iniciarSesion(e, authenticateUser)} className="col-md-8">
                                    {error && <Error error={error} />}

                                    <div className="form-group">
                                        <label>Usuario</label>
                                        <input
                                            onChange={this.actualizarState}
                                            value={user}
                                            type="text"
                                            name="user"
                                            className="form-control"
                                            placeholder="Nombre Usuario"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input
                                            onChange={this.actualizarState}
                                            value={password}
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Password"
                                        />
                                    </div>

                                    <button
                                        disabled={loading || this.validarForm()}
                                        type="submit"
                                        className="btn btn-success float-right"
                                    >
                                        Iniciar Sesión
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

export default withRouter(Login);

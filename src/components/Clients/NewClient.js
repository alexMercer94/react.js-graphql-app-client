import React, { Component, Fragment } from 'react';
import { NEW_CLIENT } from '../../mutations';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class NewClient extends Component {
    state = {
        client: {
            name: '',
            surname: '',
            company: '',
            age: '',
            email: '',
            type: ''
        },
        error: false,
        emails: []
    };

    /**
     * Add new email input
     */
    newField = () => {
        this.setState({
            emails: this.state.emails.concat([{ email: '' }])
        });
    };

    /**
     * Delete an email intpu from state
     */
    deleteField = i => {
        this.setState({
            emails: this.state.emails.filter((email, index) => i !== index)
        });
    };

    readField = (i, e) => {
        const newEmail = this.state.emails.map((email, index) => {
            if (i !== index) {
                return email;
            }
            return {
                ...email,
                email: e.target.value
            };
        });

        this.setState({
            emails: newEmail
        });
    };

    render() {
        const { error } = this.state;
        const idSeller = this.props.session.getUser.id;

        let response = error ? (
            <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p>
        ) : (
            ''
        );

        return (
            <Fragment>
                <h2 className="text-center">Nuevo Cliente</h2>
                {response}
                <div className="row justify-content-center">
                    <Mutation mutation={NEW_CLIENT} onCompleted={() => this.props.history.push('/clients')}>
                        {createClient => (
                            <form
                                className="col-md-8 m-3"
                                onSubmit={e => {
                                    e.preventDefault();
                                    const { name, surname, company, age, type } = this.state.client;
                                    const { emails } = this.state;

                                    if (name === '' || surname === '' || company === '' || age === '' || type === '') {
                                        this.setState({
                                            error: true
                                        });
                                        return;
                                    }

                                    this.setState({
                                        error: false
                                    });

                                    const input = {
                                        name,
                                        surname,
                                        company,
                                        age: Number(age),
                                        emails,
                                        type,
                                        seller: idSeller
                                    };
                                    createClient({
                                        variables: { input }
                                    });
                                }}
                            >
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nombre"
                                            onChange={e => {
                                                this.setState({
                                                    client: {
                                                        ...this.state.client,
                                                        name: e.target.value
                                                    }
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Apellido</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Apellido"
                                            onChange={e => {
                                                this.setState({
                                                    client: {
                                                        ...this.state.client,
                                                        surname: e.target.value
                                                    }
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label>Empresa</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Empresa"
                                            onChange={e => {
                                                this.setState({
                                                    client: {
                                                        ...this.state.client,
                                                        company: e.target.value
                                                    }
                                                });
                                            }}
                                        />
                                    </div>
                                    {this.state.emails.map((input, index) => (
                                        <div key={index} className="form-group col-md-12">
                                            <label>Correo: {index + 1}</label>
                                            <div className="input-group">
                                                <input
                                                    onChange={e => this.readField(index, e)}
                                                    type="email"
                                                    placeholder="Email"
                                                    className="form-control"
                                                ></input>
                                                <div className="input-group-append">
                                                    <button
                                                        onClick={() => this.deleteField(index)}
                                                        type="button"
                                                        className="btn btn-danger"
                                                    >
                                                        {' '}
                                                        &times; Eliminar{' '}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="form-group d-flex justify-content-center col-md-12">
                                        <button onClick={this.newField} type="button" className="btn btn-warning">
                                            + Agregar Email
                                        </button>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Edad</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Edad"
                                            onChange={e => {
                                                this.setState({
                                                    client: {
                                                        ...this.state.client,
                                                        age: e.target.value
                                                    }
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Tipo Cliente</label>
                                        <select
                                            className="form-control"
                                            onChange={e => {
                                                this.setState({
                                                    client: {
                                                        ...this.state.client,
                                                        type: e.target.value
                                                    }
                                                });
                                            }}
                                        >
                                            <option value="">Elegir...</option>
                                            <option value="PREMIUM">PREMIUM</option>
                                            <option value="BASICO">BÁSICO</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success float-right">
                                    Agregar Cliente
                                </button>
                            </form>
                        )}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(NewClient);

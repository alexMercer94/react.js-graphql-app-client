import React, { Component, Fragment } from 'react';

class NewClient extends Component {
    state = {
        client: {
            name: '',
            surname: '',
            company: '',
            age: '',
            email: '',
            type: ''
        }
    };

    render() {
        return (
            <Fragment>
                <h2 className="text-center">Nuevo Cliente</h2>
                <div className="row justify-content-center">
                    <form
                        className="col-md-8 m-3"
                        onSubmit={e => {
                            e.preventDefault();
                            const { name, surname, company, age, email, type } = this.state.client;
                            const input = {
                                name,
                                surname,
                                company,
                                age: Number(age),
                                email,
                                type
                            };
                            console.log(input);
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
                            <div className="form-group col-md-6">
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
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    onChange={e => {
                                        this.setState({
                                            client: {
                                                ...this.state.client,
                                                email: e.target.value
                                            }
                                        });
                                    }}
                                />
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
                            Guardar Cambios
                        </button>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default NewClient;

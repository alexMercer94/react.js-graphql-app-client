import React, { Component } from 'react';

class Paginator extends Component {
    state = {
        paginator: {
            pages: Math.ceil(Number(this.props.totalClients) / this.props.limit)
        }
    };

    render() {
        const { actual } = this.props;
        const btnAnterior =
            actual > 1 ? (
                <button type="button" onClick={this.props.previousPage} className="btn btn-success mr-2">
                    &laquo; Anterior
                </button>
            ) : (
                ''
            );
        const { pages } = this.state.paginator;
        const btnNext =
            actual !== pages ? (
                <button type="button" onClick={this.props.nextPage} className="btn btn-success">
                    Siguiente &raquo;
                </button>
            ) : (
                ''
            );
        return (
            <div className="mt-5 mb-5 d-flex justify-content-center">
                {btnAnterior}
                {btnNext}
            </div>
        );
    }
}

export default Paginator;

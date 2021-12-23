import React, {Component} from 'react';

class ErrorButton extends Component {

    state = {
        renderError: false
    }

    render() {
        console.log('renderError')
        if (this.state.renderError) {
            this.foo.bar = 0
        }
        return (
            <button
                className="btn btn-danger btn-lg mb-3 ml-3"
                onClick={() => this.setState({renderError: true})}>
                Im a error
            </button>
        );
    }
}

export default ErrorButton;
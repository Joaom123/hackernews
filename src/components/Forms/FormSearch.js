import React, {Component} from "react";

class FormSearch extends Component {
    render() {
        const {
            value,
            onChange,
            onSubmit,
            children
        } = this.props;

        return (
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    ref={el => this.input = el}
                />
                <button type="submit">
                    {children}
                </button>
            </form>
        );

    }

    componentDidMount() {
        if (this.input) this.input.focus();
    }
}

export default FormSearch;
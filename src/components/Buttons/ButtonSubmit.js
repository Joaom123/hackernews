import React from "react";
import PropTypes from 'prop-types';

const ButtonSubmit = ({onClick, className = '', children}) =>
    <button onClick={onClick} className={className} type='button'>
        {children}
    </button>;

ButtonSubmit.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default ButtonSubmit;

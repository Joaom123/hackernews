import React from "react";

const ButtonSubmit = ({onClick, className = '', children}) =>
    <button onClick={onClick} className={className} type='button'>
        {children}
    </button>;

export default ButtonSubmit;

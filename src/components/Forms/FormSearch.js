import React from "react";

const FormSearch = ({value, onChange, children, onSubmit}) =>
    <form onSubmit={onSubmit}>
        <input
            type="text"
            value={value}
            onChange={onChange}
        />
        <button type="submit">
            {children}
        </button>
    </form>;

export default FormSearch;
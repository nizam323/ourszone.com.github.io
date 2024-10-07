import React from "react";

function Form_inp(props) {

    const { children,placeholder, id, type, onChange, value } = props;

    return (
        <>
            <input className="form-inp" value={value} onChange={onChange} type={type} placeholder={placeholder} id={id}/>
            {children}
        </>
    )
}

export default Form_inp
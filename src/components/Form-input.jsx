import React from "react";

function Form_inp(props) {

    const { placeholder, id, type, onChange, value } = props;

    return (
        <>
            <input className="form-inp" value={value} onChange={onChange} type={type} placeholder={placeholder} id={id}/>
        </>
    )
}

export default Form_inp
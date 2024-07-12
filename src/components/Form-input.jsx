import React from "react";

function Form_inp(props) {

    const { placeholder, id, type } = props;

    return (
        <>
            <input className="form-inp" type={type} placeholder={placeholder} id={id}/>
        </>
    )
}

export default Form_inp
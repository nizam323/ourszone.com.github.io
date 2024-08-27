import React from "react";

function Btn_sm({ btn_txt, id , onClick, classname }) {
    return (
        <>
            <button id={id} className={classname ? classname : "btn-sm" } onClick={onClick} >{btn_txt}</button>
        </>
    )
}

export default Btn_sm
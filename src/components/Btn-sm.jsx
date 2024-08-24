import React from "react";

function Btn_sm({ btn_txt, bg_color, color, id , onClick, classname }) {
    return (
        <>
            <button id={id} className={classname ? classname : "btn-sm" } onClick={onClick} style={{ backgroundColor: bg_color, color: color }}>{btn_txt}</button>
        </>
    )
}

export default Btn_sm
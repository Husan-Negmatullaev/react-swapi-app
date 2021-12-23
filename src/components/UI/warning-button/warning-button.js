import React from "react";
import './warning-button.scss'

const WarningButton = ({label = 'Give btn name', ...props}) => {
    return (
        <button {...props} className="btn btn-warning btn-lg mb-3">
            {label}
        </button>
    )
}

export default WarningButton
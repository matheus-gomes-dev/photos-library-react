import React from 'react'

export default props => (
    <i className={`fa fa-${props.icon} ${props.style}`} onClick={props.onClick} onMouseEnter={props.onMouseEnter}></i>
)

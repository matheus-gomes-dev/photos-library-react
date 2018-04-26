import React from 'react'

export default props => (
    <div>
        <button className={'btn btn-'+ props.style} title={props.title}
	        onClick={props.onClick}>
    	    <i className={'fa fa-'+ props.icon}></i>
    	</button>
    <div>
)

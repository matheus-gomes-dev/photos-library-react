import React, {Component} from 'react'
import albumsData from './data.album.js'

export default class Album extends Component{

	constructor(props){
		super(props)
		this.getAlbumID()
	}

	getAlbumID(){
		let queryPosition = window.location.href.indexOf('?')
		let queryLength = window.location.href.length
		let albumID = window.location.href.substring(queryPosition+1, queryLength)
		console.log(albumID);
		console.log(albumsData);
	}

	render(){
		return(
			<div>
				<h3>Album title</h3>
			</div>
		)
	}
}
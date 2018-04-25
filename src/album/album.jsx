import React, {Component} from 'react'
import albumsData from './album.data'

export default class Album extends Component{

	constructor(props){
		super(props)
		this.state = {...this.getAlbumInfo()}
	}

	getAlbumInfo(){
		let queryPosition = window.location.href.indexOf('?')
		let queryLength = window.location.href.length
		let albumID = window.location.href.substring(queryPosition+1, queryLength)
		let albumInfo = albumsData.find(album => album.id === albumID)
		return albumInfo;
	}

	render(){
		return(
			<div>
				<h3>{this.state.title}</h3>
			</div>
		)
	}
}
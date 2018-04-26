import React, {Component} from 'react'
import Icon from '../common/iconButton'
import albumsData from './album.data'

export default class Album extends Component{

	constructor(props){
		super(props)
		this.state = {...this.getAlbumInfo()}
		this.sortByDescription = this.sortByDescription.bind(this)
		this.sortByRating = this.sortByRating.bind(this)
		this.renderTableRows();
	}

	getAlbumInfo(){
		let queryPosition = window.location.href.indexOf('?')
		let queryLength = window.location.href.length
		let albumID = window.location.href.substring(queryPosition+1, queryLength)
		let albumInfo = albumsData.find(album => album.id === albumID)
		return albumInfo;
	}

	sortByDescription(){
		let pics = this.state.pictures;
		pics.sort((a,b) => a.description.toLowerCase() < b.description.toLowerCase())
		this.setState({...this.state, pictures: pics})

	}

	sortByRating(){
		let pics = this.state.pictures;
		pics.sort((a,b) => a.rating < b.rating)
		this.setState({...this.state, pictures: pics})
	}

	renderTableRows(){
		return this.state.pictures.map(pic => (
			<tr key={`row_${pic.id}`}>
				<td>
					<img src={pic.url} width='50' height='50'/>
				</td>
				<td>
					<span>{pic.description.length > 15 ? `${pic.description.substring(0,35)}...` : pic.description}</span>
				</td>
				<td>
					<span>{pic.rating}</span>
				</td>
			</tr>
		))
	}

	render(){
		return(
			<div>
				<h3>{this.state.title}</h3>
				<table className='table'>
					<thead>
						<tr>
					        <th>
					        	<span>Thumbnail</span>
					        </th>
					        <th>
					        	<span>Description</span>
					        	<Icon icon='angle-down' style='table-icon' onClick={() => this.sortByDescription()}></Icon></th>
					        <th>
					        	<span>Rating</span>
					        	<Icon icon='angle-down' style='table-icon' onClick={() => this.sortByRating()}></Icon></th>
      					</tr>
					</thead>
					<tbody>
						{this.renderTableRows()}
					</tbody>
				</table>
			</div>
		)
	}
}
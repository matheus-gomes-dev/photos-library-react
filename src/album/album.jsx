import React, {Component} from 'react'
import Icon from '../common/iconButton'
import albumsData from './album.data'

export default class Album extends Component{

	constructor(props){
		super(props)
		this.state = {...this.getAlbumInfo()}
		this.sortByDescription = this.sortByDescription.bind(this)
		this.sortByRating = this.sortByRating.bind(this)
		this.starHover = this.starHover.bind(this)
		this.starClick = this.starClick.bind(this)
		this.renderTableRows();
	}

	getAlbumInfo(){
		const queryPosition = window.location.href.indexOf('?')
		const queryLength = window.location.href.length
		const albumID = window.location.href.substring(queryPosition+1, queryLength)
		const albumInfo = albumsData.find(album => album.id === albumID)
		return albumInfo;
	}

	sortByDescription(){
		const pics = this.state.pictures;
		pics.sort((a,b) => a.description.toLowerCase() < b.description.toLowerCase())
		this.setState({...this.state, pictures: pics})

	}

	sortByRating(){
		const pics = this.state.pictures;
		pics.sort((a,b) => a.rating < b.rating)
		this.setState({...this.state, pictures: pics})
	}

	starHover(){
		console.log("Hover star!")
	}

	starClick(){
		console.log("star clicked!")
	}

	renderRatingStars(rating, pictureID){
		let auxArray = []
		for(var i=0; i < Math.floor(rating); i++){
			auxArray[i] = 1;
		}
		//handle decimal ratings
		const decimalRating = rating % 1;
		if(decimalRating >= 0.25 && decimalRating < 0.75)
			auxArray[i] = 0.5;
		else if(decimalRating > 0.75)
			auxArray[i] = 1;
		return auxArray.map((rating, index) => (
			(rating === 1) ? 
				<Icon key={`ID${pictureID}_ratingStar${index}`} icon='star' onMouseEnter={() => this.starHover()} onClick={() => this.starHover()}/> : 
				<Icon key={`ID${pictureID}_ratingStar${index}`} icon='star-half' onMouseEnter={() => this.starHover()} onClick={() => this.starHover()}/>

		))
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
				<td key={`rating_${pic.id}`}>
					{this.renderRatingStars(pic.rating, pic.id)}
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
					        	<Icon icon='angle-down' style='table-icon' onClick={() => this.sortByDescription()} />
					        </th>
					        <th>
					        	<span>Rating</span>
					        	<Icon icon='angle-down' style='table-icon' onClick={() => this.sortByRating()} />
					        </th>
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
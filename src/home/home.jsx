import React from 'react'
import albumsList from '../album/data.album.js'

export default props => {

	const renderAlbumsList = () => {
		return albumsList.map(album => (
			<li key={album.id}>
				<a href={`#/album?${album.id}`}>{album.title}</a>
			</li>
			)
		)
	}

	return(
		<div>
			<h3>My albums</h3>
			<ul>
				{renderAlbumsList()}
			</ul>
		</div>
	)
}
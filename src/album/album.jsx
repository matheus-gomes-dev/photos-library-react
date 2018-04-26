import React, {Component} from 'react'
import Icon from '../common/iconButton'
import albumsData from './album.data'
import Modal from 'react-modal';
Modal.setAppElement('#app');

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overlfow: 'scrol',
    maxHeight: '90%',
    maxWidth: '90%'
  }
};

const arrayOfStars = rating => {
	let starsArray = []
	for(var i=0; i < Math.floor(rating); i++){
		starsArray[i] = {value: 1, status: 'default'};
	}
	//handle decimal ratings
	const decimalRating = rating % 1;
	if(decimalRating >= 0.25 && decimalRating < 0.75){
		starsArray[i] = {value: 0.5, status: 'default'};
		i+=1;
	}
	else if(decimalRating > 0.75){
		starsArray[i] = {value: 1, status: 'default'};
		i+=1;
	}
	//handle empty stars
	for(i; i<5; i++)
		starsArray[i] = {value: 0, status: 'default'};
	return starsArray;
}

export default class Album extends Component{

	constructor(props){
		super(props)
		this.state = {...this.getAlbumInfo(), sortingMethod: '', modalIsOpen: false};
		this.sortByDescription = this.sortByDescription.bind(this);
		this.sortByRating = this.sortByRating.bind(this);
		this.starHover = this.starHover.bind(this);
		this.reloadStars = this.reloadStars.bind(this);
		this.starClick = this.starClick.bind(this);
		this.openModal = this.openModal.bind(this);
    	this.closeModal = this.closeModal.bind(this);
		this.renderTableRows();
	}

	componentDidMount() {
		//reload stars with data from localStorage
		this.state.pictures.map(pic => this.reloadStars(pic.id));
	}

	openModal(picID) {
		const picInfo = this.state.pictures.find(item => item.id === picID)
		this.setState({
			...this.state,
			modalIsOpen: true,
			currentDescription: picInfo.description,
			currentImageSrc: picInfo.url,
			currentPic: picInfo,
			currentPicId: picID
		})
  	}

  	closeModal() {
    	this.setState({...this.state, modalIsOpen: false});
  	}

	getAlbumInfo(){
		const queryPosition = window.location.href.indexOf('?')
		const queryLength = window.location.href.length
		const albumID = window.location.href.substring(queryPosition+1, queryLength)
		const albumInfo = albumsData.find(album => album.id === albumID)
		albumInfo.pictures.map((pic,index) => {
			albumInfo.pictures[index].starsArray = arrayOfStars(pic.rating);
		})
		albumInfo.pictures = this.checkLocalStorage(albumInfo)
		return albumInfo;
	}

	checkLocalStorage(originalAlbumInfo){
		let storedAlbumInfo = window.localStorage.getItem(`photos_library_app_albumID_${originalAlbumInfo.id}`);
		if(storedAlbumInfo === null)
			return originalAlbumInfo.pictures;
		storedAlbumInfo = JSON.parse(storedAlbumInfo);
		const picsArray = originalAlbumInfo.pictures;
		storedAlbumInfo.map(pic => {
			let index = picsArray.findIndex(item => item.id === pic.id)
			picsArray[index].rating = pic.rating;
			picsArray[index].votes = pic.votes;
		});
		return picsArray;
	}

	sortByDescription(){
		const pics = this.state.pictures;
		pics.sort((a,b) => a.description.toLowerCase() < b.description.toLowerCase())
		this.setState({...this.state, pictures: pics, sortingMethod: 'description'});

	}

	sortByRating(){
		const pics = this.state.pictures;
		pics.sort((a,b) => a.rating < b.rating);
		this.setState({...this.state, pictures: pics, sortingMethod: 'rating'});
	}

	starHover(picID, starIndex){
		let auxArray = this.state.pictures
		const picIndex = auxArray.findIndex(pic => pic.id === picID)
		auxArray[picIndex].starsArray.map((star, index) => {
			if(index <= starIndex){
				auxArray[picIndex].starsArray[index].status = 'yellow';
				auxArray[picIndex].starsArray[index].value = 1;
			}
		})
		this.setState({...this.state, pictures: auxArray});
	}

	reloadStars(picID){
		let auxArray = this.state.pictures
		const picIndex = auxArray.findIndex(pic => pic.id === picID)
		auxArray[picIndex].starsArray.map((star, index) => {
			auxArray[picIndex].starsArray = arrayOfStars(auxArray[picIndex].rating);
		})
		this.setState({...this.state, pictures: auxArray});
	}

	chooseStarIcon(num){
		switch(num){
			case 0.5:
				return 'star-half-o';
			case 1:
				return 'star';
				break;
			default:
				return 'star-o';
		}
	}

	starClick(picID, starIndex){
		//fazer efeito de aumentar tamanho da estrela ao click;
		//melhoria para a experiencia do usuário (improvement of user experience)
		let auxArray = this.state.pictures;
		const picIndex = auxArray.findIndex(pic => pic.id === picID);
		let rating = auxArray[picIndex].rating;
		rating = ((rating*auxArray[picIndex].votes + (starIndex+1))/(auxArray[picIndex].votes+1)).toFixed(1);
		auxArray[picIndex].votes+=1;
		auxArray[picIndex].rating = rating;
		this.setState({...this.state, pictures: auxArray});
		if(this.state.sortingMethod === 'rating')
			this.sortByRating();
		let infoToBeStored = this.state.pictures.map(item => ({id: item.id, rating: item.rating, votes: item.votes}))
		window.localStorage.setItem(`photos_library_app_albumID_${this.state.id}`, JSON.stringify(infoToBeStored));
	}

	renderRatingStars(pictureObj, pictureID){

		if(!pictureObj)
			return false

		return pictureObj.starsArray.map((rating, starIndex) => {
			return(
				<Icon 
					key={`ID${pictureID}_ratingStar${starIndex}`}
					icon={this.chooseStarIcon(rating.value)}
					style={rating.status === 'default' ? '' : 'yellow'}
					onMouseEnter={() => this.starHover(pictureID, starIndex)}
					onMouseLeave={() => this.reloadStars(pictureID)}
					onClick={() => this.starClick(pictureID, starIndex)}
					rating={pictureObj.rating}
					votes={pictureObj.votes}
				/>
			)
		})
	}

	renderTableRows(){
		return this.state.pictures.map(pic => (
			<tr key={`row_${pic.id}`}>
				<td>
					<img src={pic.url} onClick={() => this.openModal(pic.id)} width='50' height='50'/>
				</td>
				<td>
					<span>{pic.description.length > 15 ? `${pic.description.substring(0,35)}...` : pic.description}</span>
				</td>
				<td key={`rating_${pic.id}`}>
					{this.renderRatingStars(pic, pic.id)}
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
				<div>
        			<div className='modal'>
				        <Modal
				          	isOpen={this.state.modalIsOpen}
				          	onAfterOpen={this.afterOpenModal}
				          	onRequestClose={this.closeModal}
				          	style={customStyles}
				          	contentLabel="Example Modal"
				        >
				          	<div className='text-center'>
				          		<img src={this.state.currentImageSrc}/>
				          		<br/>
				          		<div className='img-description'>
					          		<span>{this.state.currentDescription}</span>
					          	</div>
					          	<div className='img-rating'>
					          		{this.renderRatingStars(this.state.currentPic, this.state.currentPicId)}
					          	</div>
					        </div>
				          	
				        </Modal>
				    </div>
		      	</div>
			</div>
		)
	}
}
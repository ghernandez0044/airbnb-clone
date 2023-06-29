// Necessary imports
import { NavLink, useHistory } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import Confirmation from '../Confirmation'
import { deleteASpot } from '../../store/spots'
import { loadSpot } from '../../store/oneSpot'
import { getSpot } from '../../store/spots'
import { getReviews } from '../../store/reviews'
import { getUserBookings } from '../../store/bookings'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import './SpotGalleryCard.css'

function SpotGalleryCard({ spot, manage }){

    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Consume Modal Context for desired function
    const { closeModal } = useModal()

    // Subscribe to current user slice of state
    const user = useSelector(state => state.session.user)

    // Deconstruct desired properties from spot passed in through props
    const { id, address, avgRating, city, country, description, lat, lng, name, previewImage, price, state } = spot

    // Function to handle yes on confirmation modal
    const onYes = () => {
        dispatch(deleteASpot(id))
        closeModal()
        history.push('/spots/current')
    }

    // Function to handle no on confirmation modal
    const onNo = () => {
        closeModal()
        history.push('/spots/current')
    }

    // Function to redirect user to update page
    const onClick = () => {
        dispatch(getSpot(id)).then(res => history.push(`/spots/${id}/edit`))
       
    }

    // Function to load spot details and reviews upon click
    const load = () => {
        dispatch(getSpot(id)).then(res => loadSpot(id)).then(res => dispatch(getReviews(id))).then(res => dispatch(getUserBookings(user.id)))
    }  // when i click on the spot card, i want to dispatch a thunk to get all the user bookings


    return (
        <li>
            <div className="card" title={name}>
                <NavLink exact to={`/spots/${id}`} onClick={load}>
                    <img src={previewImage} alt='' />
                    <div className="content-container">
                        <div className='city-container'>
                            <h4>{city}, {state}</h4>
                            {avgRating ? <p><i className='fa-solid fa-star' /> {avgRating}</p> : <p><i className='fa-solid fa-star' />New</p>}
                        </div>
                        <div className='price-info-container'>
                            <p><b>${Number(price).toFixed(2)}</b> /night</p>
                        </div>
                    </div>
                </NavLink>
                {
                    manage && (
                        <div className='manage-buttons-container'>
                                <button onClick={onClick} className='manage-button'>Update</button>
                            <OpenModalButton className='manage-button' modalComponent={<Confirmation label='Confirm Delete' message='Are you sure you want to remove this spot from the listings?' onYes={onYes} yesLabel='Delete Spot' onNo={onNo} noLabel='Keep Spot' />} buttonText='Delete' />
                        </div>
                    )
                }
            </div>
        </li>
    )
}

export default SpotGalleryCard
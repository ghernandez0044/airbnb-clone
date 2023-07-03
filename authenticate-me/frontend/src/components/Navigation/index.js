// Necessary imports
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ProfileButton from './ProfileButton'
import logo from '../../assets/spotsbnblogo.png'
import SearchBar from '../SearchBar'
import './Navigation.css'

function Navigation({ isLoaded }){
    // Grab reference to current user in state
    const sessionUser = useSelector((state) => state.session.user)

    return (
        <nav className='h-12 px-5 py-5 flex flex-auto z-10 justify-center items-center my-2.5'>
            <div className='flex flex-auto justify-center items-center w-28'>
                <div className='logo-div'>
                    <NavLink exact to='/'>
                        <img src={logo} alt='' style={{ height: '75px', width: '75px' }} />
                    </NavLink>
                </div>
            </div>
            <SearchBar />
            <ul className='nav-links'>
                <div className={sessionUser ? 'menu' : 'menu right'}>
                    {isLoaded && (
                        <>
                            {sessionUser && <li id='create-spot'>
                                <NavLink exact to ='/spots/new'>
                                    <p className='links'>Create A Spot</p>
                                </NavLink>
                            </li>}
                            <li>
                                <ProfileButton user={sessionUser} />
                            </li>
                        </>
                    )}
                </div>
            </ul>
        </nav>
    )
}

export default Navigation
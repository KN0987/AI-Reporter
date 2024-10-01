import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from "react-redux";
import {logo} from "../assets";

export default function Header() {
  const {currentUser} = useSelector((state) => state.user);

  return (
    <header className = "w-full flex justify-around items-center py-3 bg-white sticky top-0 z-50 shadow">
        <Link to="/">
        
        <img src={logo} alt="app logo" className="w-28 object-contain "/>
        </Link>
        <nav className="flex justify-between items-center flex-row">
        <ul>
        <Link to='/profile'>
          {currentUser ? (<div className="relative inline-block group"><img className="h-14 w-14 rounded-full object cover" src={currentUser.profilePicture} alt="profile" data-tooltip-target="tooltip-animation"/>
            <div id="tooltip-animation" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700 group-hover:visible group-hover:opacity-100">
            Account Details
            <div className="tooltip-arrow" data-popper-arrow></div>
            </div> 
          </div>):(<li>Sign In</li>)}

        </Link>
        </ul>
      </nav>
    </header>


  )

}

import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from "react-redux";

export default function Header() {
  const {currentUser} = useSelector((state) => state.user);

  return (
    <header className="w-full flex justify-between items-center py-4 px-8 header-glass sticky top-0 z-50">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <span className="font-bold text-2xl text-white">
          AI<span className="gradient-text">Summarizer</span>
        </span>
      </Link>
      
      <nav className="flex items-center">
        {currentUser ? (
          <Link to='/profile' className="group relative">
            <div className="relative">
              <img 
                className="h-12 w-12 rounded-full object-cover border-2 border-white/30 shadow-lg hover:border-white/50 transition-all duration-300 group-hover:scale-110" 
                src={currentUser.profilePicture} 
                alt="profile" 
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Account Settings
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45"></div>
            </div>
          </Link>
        ) : (
          <Link to="/sign-in">
            <button className="premium-button">
              Sign In
            </button>
          </Link>
        )}
      </nav>
    </header>
  )
}
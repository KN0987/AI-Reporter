import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() {
  return (
    <div className="bg-slate-200">
        <div className = "flex justify-between items-center pl-12 p-3">
            <h1 className = "font-bold">AI Reporter</h1>
            <ul className="flex gap-4 pr-12">
              <Link to='/'>
                <li>Home</li>
              </Link>
              
              <Link to='/about'>
                <li>About</li>
              </Link>

              <Link to='/sign-in'>
                <li>Sign In</li>
                </Link>
            </ul>
        </div>
    </div>
  )
}

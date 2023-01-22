import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
      <nav className='navbar'>
        <ul className='links'>
          <li > <Link to="/">Ansatte</Link> </li>
          <li > <Link to="/stillinger">Stillinger </Link> </li>
          <li > <Link to="/oppgaver">Oppgaver</Link> </li>
        </ul>
      </nav>
  )
}

export default NavBar

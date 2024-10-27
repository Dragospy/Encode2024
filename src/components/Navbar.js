import React from 'react';
import './navbar.css';
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <div className='navigation-menu'>
        <ol>
            <li><Link to={"/home"}>Explore</Link></li>
            <li><Link to={"/createlisting"}>Create Listing</Link></li>
        </ol>
    </div>
  )
}

export default Navbar

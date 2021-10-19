import React from "react";
import './styled/Navbar.css'
import '../../static/icons/FontAwesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


const BottomNav = () => {
    return (
        <nav className="wrapper">
            <div>
                <Link to='/home' className='nav-link'>
                    <FontAwesomeIcon icon="house"/>
                </Link>                
            </div>
            <div>
                <Link to='/search' className='nav-link'>
                    <FontAwesomeIcon icon="magnifying-glass"/>
                </Link>
            </div>
            <div>
                <Link to='/messenger' className='nav-link'>
                    <FontAwesomeIcon icon="comment"/>
                </Link>
            </div>
            <div>
                <Link to='/userinfo' className='nav-link'>
                    <FontAwesomeIcon icon="user"/>
                </Link>
            </div>            
        </nav>
    );
}

export default BottomNav;
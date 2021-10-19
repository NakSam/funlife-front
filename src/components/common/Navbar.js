import React from "react";
import './styled/Navbar.css'
import '../../static/icons/FontAwesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';


const BottomNav = () => {
    return (
        <nav className="wrapper">
            <div>
                <Link to='/home' className='nav-link'>
                    <IconButton size="small">
                        <FontAwesomeIcon icon="house"/>
                    </IconButton>
                </Link>                
            </div>
            <div>
                <Link to='/search' className='nav-link'>
                    <IconButton size="small">
                        <FontAwesomeIcon icon="magnifying-glass" onMouseOver/>
                    </IconButton>                    
                </Link>
            </div>
            <div>
                <Link to='/messenger' className='nav-link'>
                    <IconButton size="small">
                        <FontAwesomeIcon icon="comment"/>
                    </IconButton>
                </Link>
            </div>
            <div>
                <Link to='/userinfo' className='nav-link'>
                    <IconButton size="small">
                        <FontAwesomeIcon icon="user"/>
                    </IconButton>
                </Link>
            </div>            
        </nav>
    );
}

export default BottomNav;
import React from "react";
import './styled/Navbar.css'
import '../../static/icons/FontAwesome'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';


const BottomNav = () => {
    const userData = useSelector(state => state.userdata);
    return (
        <nav className="wrapper">
            <div>
                <Link to='/'>
                    <IconButton size="small">
                        <FontAwesomeIcon icon="house"/>
                    </IconButton>
                </Link>                
            </div>
            <div>
                <Link to='/search'>
                    <IconButton size="small">
                        <FontAwesomeIcon icon="magnifying-glass"/>
                    </IconButton>                    
                </Link>
            </div>
            <div>
                <Link to='/messenger'>
                    <IconButton size="small">
                        <Badge color="error" badgeContent={userData.count} max={99}>
                            <FontAwesomeIcon icon="comment"/>
                        </Badge>
                    </IconButton>                    
                </Link>
            </div>
            <div>
                <Link to='/userinfo'>
                    <IconButton size="small">
                        <FontAwesomeIcon icon="user"/>
                    </IconButton>
                </Link>
            </div>            
        </nav>
    );
}

export default BottomNav;
import './NavBar.css'

import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { sDataView, SidebarData } from './SideBar';
import {IconContext} from "react-icons" 

export default function  Nav(props){    
    const [sidebar, setSideBar] = useState(false);
    const showSideBar = () => setSideBar(!sidebar);
    
    return (
    <div>
       
        <div className='navBar'> 
            <Link to = "#" className='menu-bar'>
                <AiIcons.AiOutlineMenu className='sidebar-icons-1' onClick={showSideBar}/>
            </Link>
        </div>
        
    

        <IconContext.Provider value={{color: '#f5f5f5'}}>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li className='navbar-toggle'>
                        <Link to = "#" className='menu-bar'>
                            <AiIcons.AiOutlineClose className='sidebar-icons' onClick={showSideBar}/>
                        </Link>
                    </li>
                    {sDataView}
                </ul>
            </nav>
        </IconContext.Provider>    
    </div>
    );
}
  
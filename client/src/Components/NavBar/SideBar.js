import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'User Profile',
        path: '/Profile',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },

    {
        title: 'Recommendations',
        path: '/Recommendations',
        icon: <AiIcons.AiFillReconciliation/>,
        cName: 'nav-text'
    },

    {
        title: 'Add Exercises',
        path: '/newExercise',
        icon: <IoIcons.IoIosCopy/>,
        cName: 'nav-text'
    },
    {
        title: 'Login Page',
        path: '/',
        icon: <AiIcons.AiOutlineLogin/>,
        cName: 'nav-text'
    }
]

export const sDataView = 

    SidebarData.map((item, index) => {
    return(
    <li key ={index} className ={item.cName}>
        <Link to ={item.path}> 
            {item.icon}
            <span>{item.title} </span>
        </Link>
    </li>
)})

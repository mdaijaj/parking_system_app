import React, { useEffect, useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import Routing from './menubar';
import {allMenu} from  '../data_store'
import './sidebar.css'

const Sidebar = ({isLogin}) => {
  const [showdata, setShowdata]= useState([])
  const [activeMenuItem, setActiveMenuItem] = useState('');

  useEffect(()=>{

    let data= JSON.parse(localStorage.getItem('user'))
    console.log("data...", data)
    if(data){
      setShowdata(data)
    }
  
  }, [isLogin])
  
  return (
    <div style={{ display: 'flex', height: '150vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
          Car Online Parking
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
          {allMenu?.map((menu, index) => (
              <NavLink
                key={index}
                exact to={menu.path}
                activeClassName="activeClicked"
                className="nav-link" // Add className to style NavLink
              >
                <CDBSidebarMenuItem icon={menu.icon} active={activeMenuItem === menu.path}>
                  {menu.module_name}
                </CDBSidebarMenuItem>              
                </NavLink>
            ))}

          </CDBSidebarMenu> 
        </CDBSidebarContent>
      </CDBSidebar>
      <Routing/>
    </div>
  );
}; 

export default Sidebar;
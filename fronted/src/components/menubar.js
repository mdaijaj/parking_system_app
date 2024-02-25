import Errorpage from './error';
import {Route, Routes} from 'react-router-dom';

import HomePage from './home'
import Userdata from './table';
import ParkingSpaceList from './parking_space';
import AddUser from './add_users'
import Login from './login'
import ParkingTicketBook from './parking_ticket_book'
import AgentList from './agent_list';
import ParkingSpaceService from './parking_service';
import OnboardingDetails from './onboarding_update';
import UserDetails from './update_user';



const Routing=()=>{


  return(
    <>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />  
          <Route path="/add_user" element={<AddUser/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/parkingSpaceList" element={<ParkingSpaceList/>} />  
          <Route path="/parking_ticket" element={<ParkingTicketBook/>} />
          <Route path="/parking_list" element={<Userdata/>} />   
          <Route path="/agent_list" element={<AgentList/>} />          
          <Route path="/new_onboarding" element={<ParkingSpaceService/>} />    
          <Route exact path="/update_user_details/:id" element={<UserDetails/>} />   
          <Route exact path="/onboarding_details/:id" element={<OnboardingDetails/>} />  
          <Route path="/*" element={<Errorpage/>} />
        </Routes>
    </>
    )
}


export default Routing;
import { useEffect, useState } from 'react';
import '../App.css'
import Loader from './loader'
import axios from 'axios';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ParkingSpaceList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userdata, setUserdata]=useState([])
    const navigate = useNavigate()


    const allUserList = async () => {
      const response = await axios.get('/api/parkingSpaceList');
      let filterData = await response.data.data
      setUserdata(filterData)
    }


    const AgentDetails = async (id) => {
        navigate(`/onboarding_details/:${id}`)
      }
  
      const deleteAchievement = async (id) => {
        await fetch(`/api/deleteParkingSpace/${id}`);
        toast.warning('delete successfully', { autoClose: 2000 })
        allUserList()
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        allUserList()
    }, [])

    return (
        <>
            <div class="container">
            <h3>All Agent Parking list</h3>
                <div>
                    {isLoading ? <Loader /> : <div>Your content here</div>}
                </div>
        {console.log("userdata", userdata)}
                <div class="row">
                    {userdata?.map((menu, index) => (
                        <div class="col-md-4" style={{ padding: "15px" }}>
                            <div class="card">
                                <div class="card-block">
                                    <h4 class="card-title"> AgentId:- {menu.agent_name}</h4>
                                    <p class="card-text">address : {menu.address}</p>
                                    <p class="card-text">city : {menu.city}</p>
                                    <p class="card-text">state : {menu.state}</p>
                                    <p class="card-text">country : {menu.country}</p>
                                    <p class="card-text">each_floor : {menu.each_floor}</p>
                                    <p class="card-text">number_of_floors : {menu.number_of_floors}</p>
                                    <p class="card-text">number_of_floors : {menu.number_of_floors}</p>
                                    <p class="card-text">description : {menu.description}</p>
                                    <button className='btn btn-info' onClick={()=>AgentDetails(menu._id)}>About</button>
                                    <Link className="btn btn-danger mr-2" style={{ margin: "5px" }} onClick={() => deleteAchievement(menu._id)}><i class="fas fa-trash"></i>
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </Link>
                                </div> <br/>

                                <h5>Floor wise table car parking</h5>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Floor No.</th>
                                            <th scope="col">Small </th>
                                            <th scope="col">Medium</th>
                                            <th scope="col">Large</th>
                                            <th scope="col">ExtraLarge</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            menu.sizeOfslots.length>0?menu.sizeOfslots.map((item, index) => {
                                                {console.log("aijaj", item)}
                                                return (
                                                    <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                            <td>{item.small}</td>
                                                            <td>{item.medium}</td>
                                                            <td>{item.large}</td>
                                                            <td>{item.extraLarge}</td>
                                                            <td>{parseInt(item.small)+ parseInt(item.medium) +parseInt(item.large) + parseInt(item.extraLarge)}</td>

                                                    </tr>
                                                )
                                            }): ""
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default ParkingSpaceList;
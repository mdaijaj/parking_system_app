import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../App.css"


const Navbar = ({}) => {
    const navigate = useNavigate()
    const cardata = localStorage.getItem("user")

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/signin')
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="#">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPV1diKLJC3pxU0cMoaNQ3PyfPOrBM1ONM3w&usqp=CAU" style={{ borderRadius: "50%" }} width="100" height="100" className="d-inline-block align-top" alt="image path not found" />
                    </NavLink>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/parking_ticket">Ticket For Parking</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/parking_list">Parking Customer List </NavLink>
                            </li>
                        </ul>
                        {!localStorage.getItem('user') ?
                            <form className='d-flex'>
                                <Link className='btn btn-dark mx-2' to="/add_user" role="button">Signup</Link>
                                <Link className='btn btn-dark mx-2' to="/login" role="button">Login</Link>
                            </form>
                            :
                            <>
                                <button onClick={handleLogout} className='btn btn-dark'>Logout</button>
                                <h4 style={{ padding: "40px" }}>{`${JSON.parse(localStorage.getItem('user'))?.first_name} ${JSON.parse(localStorage.getItem('user'))?.last_name}`}</h4>
                            </>
                        }
                    </div>
                </div>
            </nav>
           
        </>
    )
}



export default Navbar;

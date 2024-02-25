import { useState } from "react";
import {useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [userdata, setUserdata] = useState();
    const [passdata, setPassdata] = useState();
    const [userErrors, setUserErrors] = useState(false)
    const [passErrors, setPassErrors] = useState(false)


    const navigate = useNavigate()
    let name, value;


    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value

        if(value.length<3){
            setUserErrors(true)   
        }else{
            setUserErrors(false)   
        }
        setUserdata({ ...userdata, [name]: value })  //[] dynamic data for
    }

    const passInput = (e) => {
        name = e.target.name
        value = e.target.value
        if(value.length<3){
            setPassErrors(true)   
        }else{
            setPassErrors(false)   
        }
        setPassdata({ ...passdata, [name]: value })  //[] dynamic data for
    }

    const handleSubmit = async (e) => {
        console.log("userdata....", userdata)
        if(userdata.length<3 || passdata.length<3){
            toast.success('please correct username or password', { autoClose: 1000 })
        }
        e.preventDefault();
    
        const regInf = {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userdata.email,
                password: passdata.password
            })
        }
        const res = await fetch(`/api/signin`, regInf);
        const result = await res.json()
        console.log("result...", result)
        localStorage.setItem("user", JSON.stringify(result.userInfo))

        if (result.status === 200 && result) {
            toast.success('new candidate add is successfully', { autoClose: 1500 })
            navigate('/agent_list')
        }
        else {
            toast.info('Invalid user details', { autoClose: 1500 })
        }
    }


    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
            <h1>Login</h1>
            <div className="container" style={{ marginTop: "20px" }}>

                <div className="mb-4 row">
                    <div className="col-5 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={handleInput}
                            name='email'
                            id="email"
                            placeholder="Enter email..."
                        />  
                        {userErrors?  <span style={{color: "red", fontSize: "20px"}}>Username is not Valid</span> : ""}
                    </div>
                </div>
                <div className="mb-4 row">
                    <div className="col-5 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Password</label>

                        <input type="password"
                            className="form-control"
                            name="password"
                            onChange={passInput}
                            id="password"
                            placeholder="password" />
                         {passErrors?  <span style={{color: "red", fontSize: "20px"}}>Password is not Valid</span> : ""}
                    </div>
                </div>

                <div className="mb-2 row">
                    <div className="col-mdm-2">
                        <button className="btn btn-info" onClick={handleSubmit} style={{ margin: "auto", width: "200px", borderRadius: "25px", height: "50px"}}>Submit</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login;
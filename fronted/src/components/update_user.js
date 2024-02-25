import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const AgentPage = () => {

    const initialValue={
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        password: "",
    }
    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate()
    let name, value;

    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value
        setFormValues({ ...formValues, [name]: value })  //[] dynamic data for
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        const {
            first_name,
            last_name,
            email,
            mobile,
            password,
        } = formValues;

        setFormErrors(validate(formValues));

        


        const regInf = {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                mobile,
                password,
            })
        }


        if (Object.keys(formErrors).length === 0) {
            const res = await fetch(`/api/signup`, regInf);
            const result = await res.json()
            console.log("result", result)
            // localStorage.setItem("user", JSON.stringify(result.data))
            if (result.data) {
                toast.success('new candidate add is successfully', { autoClose: 1000 })
                navigate('/login')
            }
        }
        else {
            toast.info('Invalid user details', { autoClose: 1500 })
        }
    }

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.first_name) {
          errors.first_name = "Agent is required!";
        }
        if (!values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }
        if(!values.mobile){
            errors.mobile = "mobile is required!";
        }else if(values.mobile.length!=10){
            errors.mobile = "This should be correct mobile number!";
        }
        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length < 4) {
          errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
          errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
      };
    

      useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0) {
          console.log(formValues);
        }
      }, [formErrors]);

      let parObj={
        color: "red",
        fontSize: "15px"
      }


    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
            <h1>Update User Details</h1>            
            <div className="container" style={{ marginTop: "10px" }}>
            {
                Object.keys(formErrors).length === 0 ? (
                    <div className="ui message success">Signed in successfully</div>
                ) :""
            }
                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">first Name </label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            onChange={handleInput}
                            name='first_name'
                            placeholder="first_name" />
                        <p style={parObj}>{formErrors.first_name}</p>
                    </div>
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Last Name</label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            onChange={handleInput}
                            name='last_name'
                            placeholder="last_name" />
                    </div>
                </div>

                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={handleInput}
                            name='email'
                            id="email"
                            placeholder="Enter email..."
                        />
                        <p style={parObj}>{formErrors.email}</p>
                    </div>

                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Mobile Number</label>
                        <input type="number"
                            className="form-control"
                            id="mobile"
                            onChange={handleInput}
                            name='mobile'
                            placeholder="Mobile*" />
                       <p style={parObj}>{formErrors.mobile}</p>
                    </div>

                </div>
                <div className="mb-4 row">

                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Password</label>
                        <input type="password"
                            className="form-control"
                            name="password"
                            onChange={handleInput}
                            id="password"
                            placeholder="password" />
                     <p style={parObj}>{formErrors.password}</p>
                    </div>
                </div>


                <div className="mb-2 row" style={{paddingTop: "25px"}}>
                    <div className="col-mdm-2">
                        <button className="btn btn-info" onClick={handleSubmit} style={{ margin: "auto", width: "200px", borderRadius: "25px", height: "50px"}}>Update</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default AgentPage;
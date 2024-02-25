import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css";

const ParkingTicketBook=()=>{
    let initial={ 
        car_number: "",
        owner_name:"",
        starting_date: "",
        ending_date: "",
        staring_time: "",
        ending_time: "",
        slot_number: "",
        description: "",
        parking_status: "",
        car_size: "",
        duration:"",
        price: "",
    }
    const [agentdata, setAgentdata] = useState(initial);
    const navigate = useNavigate()
    const [formErrors, setFormErrors] = useState({});

    let name, value;
    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value
        console.log("krrrrrrr...", value)
        setAgentdata({ ...agentdata, [name]: value })  //[] dynamic data for
    }

    let agent_data=localStorage.getItem("user");
    let agent_id;
    if(agent_data){
        agent_id=JSON.parse(agent_data)._id
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            car_number,
            owner_name,
            starting_date,
            ending_date,
            staring_time,
            ending_time,
            slot_number,
            description,
            parking_status,
            car_size,
            duration,
            price,
            status,
        } = agentdata;

        // setIsSubmit(true);

        const regInf = {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                car_number,
                owner_name,
                starting_date,
                ending_date,
                staring_time,
                ending_time,
                slot_number,
                description,
                parking_status,
                car_size,
                duration,
                price,
                status,
                agent_id
            })
        }
       
        const res = await fetch(`/api/createParkingTicket`, regInf);
        const result = await res.json()
        console.log("result", result)
        // localStorage.setItem("user", JSON.stringify(result.data))
        if (result.data) {
            toast.success('new candidate add is successfully', { autoClose: 1500 })
            navigate(`/parking_list`)
        }else{
            toast.info(result.message, { autoClose: 1500 })
        }
    }

    let parObj={
        color: "red",
        fontSize: "15px"
      }
    
    
    return (

        <>
      <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
            <h1>Parking Slot Booking</h1>            
            <div className="container" style={{ marginTop: "10px" }}>

                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Car Number</label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            onChange={handleInput}
                            name='car_number'
                            placeholder="car_number" />
                        <p style={parObj}>{formErrors.car_number}</p>
                    </div>
                    <div className="col-6 sm-4">
                        <label for="formGroupExampleInput" class="form-label">Car Size</label>
                        <select className="form-control" id="inputGroupSelect01" onChange={handleInput} name="car_size" aria-label="select example">
                            <option selected>Car Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="extra_large">ExtraLarge</option>
                        </select>
                    </div>  
                </div>
                
                <div className="mb-4 row">
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Car Start_Date</label>
                        <input type="Date" 
                        className="form-control" 
                        id="starting_date" 
                        onChange={handleInput}
                        name='starting_date'
                        placeholder="starting_date.." />
                        <p style={parObj}>{formErrors.email}</p>
                    </div>
                    
                    
                    {/* <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Car End_Date</label>
                    <input type="Date" 
                        className="form-control" 
                        id="ending_date" 
                        onChange={handleInput}
                        name='ending_date'
                        placeholder="ending_date.." />
                        <p style={parObj}>{formErrors.email}</p>
                    </div> */}
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Car Start_Time</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={handleInput}
                            name='staring_time'
                            id="staring_time"
                            placeholder="Enter staring_time..."
                        />
                        <p style={parObj}>{formErrors.staring_time}</p>
                    </div>
                </div>
                   
                {/* <div className="mb-4 row">
             
                    <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Car End_Time</label>
                        <input type="text"
                            className="form-control"
                            id="ending_time"
                            onChange={handleInput}
                            name='ending_time'
                            placeholder="ending_time*" />
                            <p style={parObj}>{formErrors.ending_time}</p>
                    </div>
                </div> */}

                {/* <div className="mb-4 row">
                   
                    <div className="col-sm-6">
                    <label for="formGroupExampleInput" class="form-label">Parking Available Status </label>
                    <select className="form-control" id="inputGroupSelect01" onChange={handleInput} name="role_name" aria-label="select example">
                            <option selected>Available Status</option>
                            <option value="available">available</option>
                            <option value="booked">booked</option>
                        </select>
                 </div>
                 <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Duration</label>
                        <input type="number"
                            className="form-control"
                            name="duration"
                            onChange={handleInput}
                            id="duration"
                            placeholder="duration" />
                            <p style={parObj}>{formErrors.duration}</p>
                    </div>
                </div> */}
               


                <div className="mb-4 row">

                <div className="col-6 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Owner Name</label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            onChange={handleInput}
                            name='owner_name'
                            placeholder="owner_name" />
                    </div>
                   
                    {/* <div className="col-sm-4">
                    <label for="formGroupExampleInput" class="form-label">Parking Price </label>
                    <input type="number" 
                        className="form-control" 
                        id="price" 
                        onChange={handleInput}
                        name='price'
                        placeholder="price.." />
                 </div> */}

               
                </div>
                
                

                <div className="mb-4 row">
                    <div className="col-sm-8">
                        <button className="btn btn-info" onClick={handleSubmit} style={{marginRight: "75px"}}>Slot Booking</button>
                        <button className="btn btn-danger">Skip</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
        </>
      
    )
}

export default ParkingTicketBook;
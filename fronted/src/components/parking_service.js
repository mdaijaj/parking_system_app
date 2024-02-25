import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useForm, useFieldArray } from 'react-hook-form';
import axios from "axios";


const ParkingSpaceService = () => {
  let initial = {
    number_of_floors: "",
    each_floor: "",
    sizeOfslots: "",
    address: "",
    city: "",
    state: "",
    country: "",
    agent_name: "",
    description: "",
    status: ""
  };
  const [agentdata, setAgentdata] = useState(initial);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [agent, setAgent] = useState([]);

  const [data, setData] = useState();
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      list: [{ small: '',medium: '', extraLarge: '', large: '' }]
    }
  });

  console.log("handleSubmit.......", handleSubmit)
  const { fields, append, remove } = useFieldArray({
    control,
    name: "list"
  });




  const onSave = data => {
    data.list?.map((item)=> {
      let sum= parseInt(item.small) + parseInt(item.medium) +parseInt(item.large) +parseInt(item.extraLarge)
      console.log(sum)
      console.log("each_floor", agentdata.each_floor)
      if (sum!=agentdata.each_floor){
        toast.info(`It should be equal to each floor slot size!`, { autoClose: 1500 });
      }else {
        toast.success(`Each floor car size allocated successfully!`, { autoClose: 1500 });
      }
    })
    setData({ ...data });
  }

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setAgentdata({ ...agentdata, [name]: value }); //[] dynamic data for
  };

  const handleSubmitform = async (e) => {
    e.preventDefault();
    const {
      number_of_floors,
      each_floor,
      address,
      city,
      state,
      country,
      agent_name,
      description,
    } = agentdata;


    const regInf = {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number_of_floors,
        each_floor,
        sizeOfslots: data.list,
        address,
        city,
        state,
        country,
        agent_name,
        description, 
      }),
    };
    
      const res = await fetch(`/api/createInboarding`, regInf);
      const result = await res.json();
      console.log("result", result);
      if (result.data) {
        toast.success("new candidate add is successfully", { autoClose: 1500 });
        navigate(`/parkingSpaceList`);
      } else {
        toast.info(`${result.message}`, { autoClose: 1500 });
      }
  };

  let parObj = {
    color: "red",
    fontSize: "15px",
  };


  const AgentList= async()=>{
    const response = await axios.get(`api/getagentList`);
    let filterData = await response.data.data
    setAgent(filterData)
  }


  useEffect(()=>{
    AgentList()
  }, [])

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <h1> New Boarding Details...</h1>
        <div className="container" style={{ marginTop: "10px" }}>
          <div className="mb-4 row">

            <div className="col-6 sm-4">
              <label for="formGroupExampleInput" class="form-label">
              Parking Floors
            </label>
              <input
                type="number"
                className="form-control"
                id="inputName"
                onChange={handleInput}
                name="number_of_floors"
                placeholder="parking floors"
              />
              <p style={parObj}>{formErrors.number_of_floors}</p>
            </div>
            <div className="col-6 sm-4">
              <label for="formGroupExampleInput" class="form-label">
                Number of Slots
              </label>
              <input
                type="number"
                className="form-control"
                id="inputName"
                onChange={handleInput}
                name="each_floor"
                placeholder="no of slots"
              />
              <p style={parObj}>{formErrors.each_floor}</p>
            </div>
          </div>

          <div className="mb-4 row">
            <div className="col-6 sm-4">
              <label for="formGroupExampleInput" class="form-label">
                Parking Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                onChange={handleInput}
                name="address"
                placeholder="address.."
              />
              <p style={parObj}>{formErrors.email}</p>
            </div>
            <div className="col-6 sm-4">
              <label for="formGroupExampleInput" class="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                onChange={handleInput}
                name="city"
                id="city"
                placeholder="Enter city..."
              />
            </div>
          </div>

          <div className="mb-4 row">
            <div className="col-6 sm-4">
              <label for="formGroupExampleInput" class="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                onChange={handleInput}
                name="state"
                placeholder="state"
              />
            </div>
            <div className="col-6 sm-4">
              <label for="formGroupExampleInput" class="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                onChange={handleInput}
                name="country"
                placeholder="country"
              />
            </div>
          </div>

        <div className="mb-4 row">
          <div className="col-6 sm-4">
            <label for="formGroupExampleInput" class="form-label">
              Agent Name
            </label>
            <select
              className="form-select"
              id="agent_name"
              onChange={handleInput}
              name="agent_name"
              aria-label="select example"
            >
              <option selected>Select Agent</option>
            {agent?.map((menu, index) => (
                <option value={`${menu._id}`}>{`${menu.first_name} ${menu.last_name}`}</option>
            ))}
            </select>
          </div>
        </div>


        {/* array format */}

        <form onSubmit={handleSubmit(onSave)}>
        <label for="formGroupExampleInput" class="form-label">Size of Slots  </label>
          {fields.map((field, index) => (
            <div className="mb-4 row">

              <div className="col-3 sm-4" key={field.id}>
                <label for="formGroupExampleInput" class="form-label">Small Size </label>
                <input
                   name="small"
                  placeholder="Enter Small Size"
                  {...register(`list.${index}.small`)}
                />
              </div>

              <div className="col-3 sm-4" key={field.id}>
              <label for="formGroupExampleInput" class="form-label">Medium Size </label>
                <input
                  name="medium"
                  className="ml10"
                  placeholder="Enter Medium Size"
                  {...register(`list.${index}.medium`)}
                />
              </div>
              <div className="col-3 sm-4" key={field.id}>
                <label for="formGroupExampleInput" class="form-label">Large Size </label>
                <input
                  name="large"
                  placeholder="Enter large Size"
                  {...register(`list.${index}.large`)}
                />
              </div>

              <div className="col-3 sm-4" key={field.id}>
              <label for="formGroupExampleInput" class="form-label">X-Large </label>
                <input
                  name="extraLarge"
                  className="ml10"
                  placeholder="Enter X-Large Size"
                  {...register(`list.${index}.extraLarge`)}
                />
              </div>

        <div className="btn-box">
          {fields.length !== 1 && <button
            className="mr10"
            onClick={() => remove(index)}>Remove</button>}
          {fields.length - 1 === index && <button onClick={() => append({ small: '', medium: '', large: '', extralarge: '' })}>Add</button>}
        </div>
      </div>
    ))}
    <button>Submit</button>
    {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
  </form>

          <div className="mb-4 row">
            <div className="col-sm-8">
              <button
                className="btn btn-info"
                onClick={handleSubmitform}
                style={{ marginRight: "75px" }}
              >
                New On Boarding
              </button>
              <button className="btn btn-danger">Skip</button>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default ParkingSpaceService;

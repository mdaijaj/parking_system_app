const AgentModel = require('../models/agent_model')
const Bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

exports.createAgent = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    mobile,
    password,
  } = req.body;

  try {
    const AgentdetailData = await AgentModel.create({
      first_name,
      last_name,
      email,
      mobile,
      password,
    })
    return res.status(200).send({
      message: "create successfully!", data: AgentdetailData
    })
  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the AgentdetailData."
    });
  }
}


//signin agent
exports.signin= async (req,res)=>{
  try{
      const {email, password}=req.body;
      if(!password || !email){
          res.status(400).send("please fill the data...");
      }
      let agent_detail =await AgentModel.findOne({email: email})
      console.log("agent_detail", agent_detail)
      if(agent_detail){
          const isMatch=await Bcrypt.compare(password, agent_detail.password);
          if(!isMatch){
              return res.status(400).send({error: "Invalid Credentials", data: null})
          }
               // console.log("encrypted password match success!")
          let token =await jwt.sign({ agent_detail: agent_detail }, process.env.SECRET || "aijajkhan", {expiresIn: 86400 }); // expires in 24 hours
          // let token= await userInfo.generateAuthToken();
          res.cookie("jwtToken", token, {
              expires: new Date(Date.now()+ 300000000),
              httpOnly: true
          });
          res.send({
              token: token,
              userInfo: agent_detail,
              status: 200,
              message: "login Success"
          })
      }else{
          res.status(400).send({error: "email not verified please email verified...", code: 403})
      }     
  }
  catch(err){
      console.log(err.message)
      res.send("there is problem to login...", err.message)
  } 
}



exports.getAgentList = async (req, res) => {
  try {
    const AgentdetailData = await AgentModel.find()
    console.log("AgentdetailData", AgentdetailData)
    if (AgentdetailData.length>0) {
      res.status(200).send({ message: "get all AgentdetailData list", data: AgentdetailData })
    }else{
      res.status(204).send({ message: "data not found", data: AgentdetailData })
    }
  } catch (err) {
    console.log(err.message)
    res.status(400).send({ message: "error", error: err.message })
  }
}


exports.AgentDetails = async (req, res) => {
  try {
    console.log(req.params.id)
    const restData = await AgentModel.findById({
      _id: req.params.id,
    })
    console.log("restData", restData)
    if (!restData || restData == undefined) {
      return res.send("not found restaurant")
    }
    return res.status(200).send({
      message: "user resitered save data",
      data: restData
    })
  }
  catch (err) {
    console.log(err.message)
  }
}


exports.UpdateAgentDetails = async (req, res) => {
  try {

    const userdata = await AgentModel.find({ _id: req.params.id });
    if (userdata) {
      const updateData = await AgentModel.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
      })
      console.log("updateData", updateData)
      return res.send({ status: "update data successfully! ", "result": updateData })
    }
  }
  catch (err) {
    console.log(err.message)
  }
}


exports.deleteAgentTicket = async (req, res) => {
  try {

    const agentdata = await AgentModel.find({ _id: req.params.id });
    if (agentdata) {
      const updateData = await AgentModel.findByIdAndRemove({ _id: req.params.id }, {
        $set: req.body
      })
      console.log("updateData", updateData)
      return res.send({ status: "Delete data successfully! " })
    }
  }
  catch (err) {
    console.log(err.message)
  }
}






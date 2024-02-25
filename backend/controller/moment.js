const ParkingSpaceSchema = require('../models/support_ticket_model')
const AgentModel = require('../models/agent_model')

exports.createInboarding = async (req, res) => {
  const {
    number_of_floors,
    each_floor,
    sizeOfslots,
    address,
    city,
    state,
    country,
    agent_name,
    description,
    status
  } = req.body;


  try {

    if(!number_of_floors || !each_floor){
      return res.status(500).send({
        message: "It should not emply value."
      });
    }

    const ticketData = await ParkingSpaceSchema.create({
      number_of_floors,
      each_floor,
      sizeOfslots,
      address,
      city,
      state,
      country,
      agent_name,
      description,
      status
    })
    console.log("ticketdata", ticketData)
    return res.status(200).send({
      message: "create successfully!", data: ticketData
    })
  }
  catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the ticketData."
    });
  }
}



exports.parkingSpaceList = async (req, res) => {
  try {
    const parkingData = await ParkingSpaceSchema.find({})
    console.log("parkingData", parkingData)
    if (parkingData.length>0) {
      res.status(200).send({ message: "get all parkingData list", data: parkingData })
    }else{
      res.status(204).send({ message: "data not found", data: parkingData })
    }
  } catch (err) {
    console.log(err.message)
    res.status(400).send({ message: "error", error: err.message })
  }
}


exports.parkingSpaceDetails = async (req, res) => {
  try {
    console.log(req.params.id)
    const restData = await ParkingSpaceSchema.findById({
      _id: req.params.id,
    })
    console.log("restData", restData)
    if (!restData || restData == undefined) {
      return res.send("not found ticket")
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


exports.editParkingSpace = async (req, res) => {
  try {

    const ticketdata = await ParkingSpaceSchema.find({ _id: req.params.id });
    if (ticketdata) {
      const updateData = await ParkingSpaceSchema.findByIdAndUpdate({ _id: req.params.id }, {
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


exports.deleteParkingSpace = async (req, res) => {
  try {

    const ticketdata = await ParkingSpaceSchema.find({ _id: req.params.id });
    if (ticketdata) {
      const updateData = await ParkingSpaceSchema.findByIdAndRemove({ _id: req.params.id }, {
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


exports.paginationData = async (req, res) => {

  let { page, size, sort } = req.query;
  if (!page) {
    page = 1;
  }

  if (!size) {
    size = 10;
  }

  const limit = parseInt(size);
  const user = await ParkingSpaceSchema.find().limit(limit)
  res.send({
    page,
    size,
    Info: user,
  });
}








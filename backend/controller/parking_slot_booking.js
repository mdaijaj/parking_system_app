const ParkingSlotBooking = require('../models/slot_booking_model')
const ParkingSpaceSchema = require('../models/support_ticket_model')

exports.createParkingTicket = async (req, res) => {
  const {
    car_number,
    owner_name,
    starting_date,
    ending_date,
    staring_time,
    ending_time,
    description,
    car_size,
    price,
    status,
    agent_id
  } = req.body;

console.log("req.body", req.body)
  try {
    let small_count;
    let medium_count;
    let large_count;
    let x_large_count;
    const last_carsizeEntry= await ParkingSlotBooking.find({car_size: car_size})

    const agend_Data= await ParkingSpaceSchema.findOne({agent_id: agent_id})
    console.log("agend_Data", agend_Data)

    if(last_carsizeEntry.length>0){
      let dataEntry=last_carsizeEntry[last_carsizeEntry.length-1]
      let sizeOfslots=agend_Data.sizeOfslots[0]
      console.log("sizeOfslots", sizeOfslots)
      if(dataEntry.small_count==parseInt(sizeOfslots.small)){
       return res.send({message: `car ${dataEntry.car_size}  size allready full parking.... `}) 
      }
      else if(dataEntry.medium_count==parseInt(sizeOfslots.medium)){
        return res.send({message: `car ${dataEntry.car_size} car size allready full parking.... `}) 
      }
      else if(dataEntry.large_count==parseInt(sizeOfslots.large)){
        return res.send({message: `car ${dataEntry.car_size} car size allready full parking.... `}) 
      }
      else if(dataEntry.x_large_count==parseInt(sizeOfslots.extraLarge)){
        return res.send({message: `car ${dataEntry.car_size} car size allready full parking.... `}) 
      }
      

      if(car_size=="small"){
        small_count=dataEntry.small_count+1
      }
      else if(car_size=="medium"){
        medium_count=dataEntry.medium_count+1
      }
      else if(car_size=="large"){
        large_count=dataEntry.large_count+1
      }   
      else if(car_size=="extralarge"){
        x_large_count=dataEntry.x_large_count+1
      }
    }else{
      if(car_size=="small"){
        small_count=1
      }
      else if(car_size=="medium"){
        medium_count=1
      }
      else if(car_size=="large"){
        large_count=large_count=1
      }   
      else if(car_size=="extralarge"){
        x_large_count=1
      }
    }

    let slot_number=Math.floor(Math.random() * 1000);
    console.log("slot_number", slot_number)


    const ticketData = await ParkingSlotBooking.create({
      car_number,
      owner_name,
      starting_date,
      ending_date,
      staring_time,
      ending_time,
      description,
      car_size,
      price,
      slot_number,
      status,
      small_count, 
      medium_count,
      large_count,
      x_large_count,
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



exports.parkingTicketList = async (req, res) => {
  try {
    const parkingData = await ParkingSlotBooking.find({})
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


exports.parkingTicketDetails = async (req, res) => {
  try {
    console.log(req.params.id)
    const restData = await ParkingSlotBooking.findById({
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


exports.editParkingTicket = async (req, res) => {
  try {

    const ticketdata = await ParkingSlotBooking.find({ _id: req.params.id });
    if (ticketdata) {
      const updateData = await ParkingSlotBooking.findByIdAndUpdate({ _id: req.params.id }, {
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


exports.deleteParkingTicket = async (req, res) => {
  try {

    const ticketdata = await ParkingSlotBooking.find({ _id: req.params.id });
    if (ticketdata) {
      const updateData = await ParkingSlotBooking.findByIdAndRemove({ _id: req.params.id }, {
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






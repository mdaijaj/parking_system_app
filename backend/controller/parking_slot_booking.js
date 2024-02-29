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

  if(!car_number || !owner_name || !starting_date || !staring_time || !car_size ){
    res.status(500).send({
      message: "It should be all valid field"
    });
  }



console.log("req.body", req.body)
  try {
    let small_count;
    let medium_count;
    let large_count;
    let x_large_count;
    const bookingData= await ParkingSlotBooking.find({agent_id: agent_id})
    console.log("agent_id", agent_id)
    const agend_Data= await ParkingSpaceSchema.findOne({agent_name: agent_id}).populate()
    console.log("agend_Data", agend_Data)
    let lastEntry;
    if(bookingData.length>0){
      lastEntry=bookingData[bookingData.length-1]
      let sizeOfslots=agend_Data.sizeOfslots[0]
      console.log("sizeOfslots", sizeOfslots)

      if(car_size=="small"){
        if(lastEntry.small_count==parseInt(sizeOfslots.small)){
          lastEntry.medium_count=lastEntry.medium_count+1
        }
        else{
          lastEntry.small_count=lastEntry.small_count+1
        }
      }
      else if(car_size=="medium"){
        if(lastEntry.medium_count==parseInt(sizeOfslots.medium)){
          lastEntry.large_count=lastEntry.large_count+1
        }else{
          lastEntry.medium_count=lastEntry.medium_count+1
        }
      }
      else if(car_size=="large"){
        if(lastEntry.large_count==parseInt(sizeOfslots.large)){
          lastEntry.x_large_count=lastEntry.x_large_count+1
        }else{
          lastEntry.large_count=lastEntry.large_count+1
        }
      }   
      else if(car_size=="extralarge"){
        if(lastEntry.x_large_count!=parseInt(sizeOfslots.extraLarge)){
          lastEntry.x_large_count=lastEntry.x_large_count+1
        }else{
          return res.send({message: `car ${lastEntry.car_size} car size allready full parking.... `}) 
        }
      }
      
    }else{
      if(car_size=="small"){
        small_count=1
      }
      else if(car_size=="medium"){
        medium_count=1
      }
      else if(car_size=="large"){
        large_count=1
      }   
      else if(car_size=="extra_large"){
        x_large_count=1
      }
    }

    console.log("lastEntry", lastEntry)

    let agentId= agend_Data?agend_Data.agent_name : agent_id
    console.log("agentId", agentId)
    let slot_number=Math.floor(Math.random() * 1000);
    console.log("slot_number", slot_number)


    const ticketData = await ParkingSlotBooking.create({
      agent_id: agentId,
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
      small_count: lastEntry?lastEntry.small_count: small_count, 
      medium_count: lastEntry?lastEntry.medium_count: medium_count,
      large_count: lastEntry?lastEntry.large_count: large_count,
      x_large_count:lastEntry?x_large_count: x_large_count,
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






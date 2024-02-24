const express= require('express')
const router=express()
const agentController= require('../controller/index')
const ParkingServerController= require('../controller/moment')
const ParkingSlotBooking= require('../controller/parking_slot_booking')



//routes for Support Agent details
router.post('/api/signup', agentController.createAgent)
router.post('/api/signin', agentController.signin)
router.get('/api/getagentList', agentController.getAgentList)
router.get('/api/getagentDetails/:id', agentController.AgentDetails)
router.put('/api/UpdateAgentDetails/:id', agentController.UpdateAgentDetails)
router.get('/api/deleteAgentDetails/:id', agentController.deleteAgentTicket)


//routes for Parking Service Routes
router.post('/api/createInboarding', ParkingServerController.createInboarding)
router.get('/api/parkingSpaceList', ParkingServerController.parkingSpaceList)
router.get('/api/parkingSpaceDetails/:id', ParkingServerController.parkingSpaceDetails)
router.put('/api/editParkingSpace/:id', ParkingServerController.editParkingSpace)
router.get('/api/deleteParkingSpace/:id', ParkingServerController.deleteParkingSpace)
router.get('/api/paginationData/:id', ParkingServerController.paginationData)


//routes for Parking Slot Booking Routes
router.post('/api/createParkingTicket', ParkingSlotBooking.createParkingTicket)
router.get('/api/parkingTicketList', ParkingSlotBooking.parkingTicketList)
router.get('/api/parkingTicketDetails/:id', ParkingSlotBooking.parkingTicketDetails)
router.put('/api/editParkingTicket/:id', ParkingSlotBooking.editParkingTicket)
router.get('/api/deleteParkingTicket/:id', ParkingSlotBooking.deleteParkingTicket)



module.exports = router;
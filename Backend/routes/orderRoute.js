import express from 'express'
import { placeOrder, placeOrderCard, placeOrderUpi, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';


const orderRouter = express.Router()

//admin feature
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)


//payment feature
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/upi',authUser,placeOrderUpi)
orderRouter.post('/card',authUser,placeOrderCard)

//user feature
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter
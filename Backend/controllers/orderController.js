import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'


//Placing orders using Cash
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address,image } = req.body;

        if (!userId || !Array.isArray(items) || items.length === 0 || !amount || !address) {
            return res.status(400).json({ success: false, message: "Missing or invalid order data" });
        }


        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Placing orders using Cards
const placeOrderCard = async (req, res) => {

}


//Placing orders using Upi
const placeOrderUpi = async (req, res) => {

}

//All orders for adminpanel
const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({})
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Order for User
const userOrders = async (req, res) => {
    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update order status from admin
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status updated" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { placeOrder, placeOrderCard, placeOrderUpi, allOrders, userOrders, updateStatus }
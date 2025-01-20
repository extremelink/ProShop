import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
// import  Order from "../models/orderModel.js";


//  @ desc get logged in user orders
//  @ route Get /api/orders/myorders
//  @ access Private
const getMyOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({ user:req.user._id });
    res.status(200).json(orders)
} )

// @desc Create new order
// @route Post /api/order
// @access Private
const addOrderItems = asyncHandler(async (req,res)=>{
    if(!req.user || req.user._id){
        console.log(" you are not defined !!!")
    }
    console.log("i was called")
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('No order itmes');
    }else{
        const order = await Order({
            orderItems: orderItems.map((x)=>(
                {
                    ...x,
                    product: x._id,
                    _id: undefined
                }
            )),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
})

//  @desc Get order by ID
//  @route Get /api/orders/:id
//  @access Private
const getOrderById = asyncHandler(async (req,res)=>{
    const { id }= req.params;
    const order = await Order.findById(id).populate('user','name email');
    if(order){
        res.status(200).json(order);
    }else{
        res.status(404)
        throw new Error('Order Not Found!')
    }
})

// @desc Update order to paid
//  @route Get / api/orders/:id/pay
//  @access Private

const updateOrderToPaid = asyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id : req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };
        const updateOrder = await order.save();
        res.status(200).json(updateOrder);
    }else{
        res.status(404)
        throw new Error('Order Not Found');
    }
    // res.send(' update order to paid');
})

// @desc Update order to delivered
//  @route Get /api/orders/:id/delivered
// @access Private

const updateOrderToDelivered = asyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    }else{
        res.status(404);
        throw new Error(404);
    }
})

// @desc Get all orders
// @route Get /api/orders
// @access Private/Admin

const getOrders = asyncHandler(async (req,res)=>{
    const orders = await Order.find({}).populate('user','id name');
    res.status(200).json(orders)
})

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
};
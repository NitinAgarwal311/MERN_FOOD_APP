const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/getOrdersByUser",async (req,res) => {
    const email = req.body.email;
     
    const response = await Order.findOne({email: email});

    if(response === null) {
        return res.json({
            error: "No Orders Yet"
        }).status(200);
        
    }

    return res.json(response).status(200);
});

router.post("/addOrder", async (req,res) => {
    console.log(req.body);
    const email = req.body.email;
     
    const response = await Order.findOne({email: email});

    if(!response) {
        const order = new Order({
            email: email,
            orders: [req.body.order]
        });

        const savedOrder = await order.save();

        if(savedOrder === order) {
            return res.json({
                message: "Order added Successfully"
            }).status("200");
        } else {
            return res.json({
                message: "Some issue adding the Order"
            }).status("200");
        }
    }

    const updateRes = await Order.updateOne({email: email}, {orders: [...response.orders, req.body.order]});

    if(updateRes.modifiedCount === 1) {
        return res.json({
            message: "Order added Successfully"
        }).status("200");
    } else {
        return res.json({
            message: "Some issue adding the Order"
        }).status("200");
    }
});

module.exports = router;
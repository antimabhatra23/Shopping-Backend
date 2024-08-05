const Order = require("../models/orderModel");

const addOrder = async (
    userId,
    items,
    totalAmount,
    status,
    address,
    soldBy,
    estimatedDeliveryDate,
    status,
    createdAt,
) => {
    const order = new Order({
        userId,
        items,
        totalAmount,
        status,
        address,
        soldBy,
        estimatedDeliveryDate,
        status,
        createdAt,
    });

    await order.save();
    return { message: "order Saved Succefully" };
};

const getOrders = async () => {
    const orders = await Order.find();
    return { message: "success", orders };
};

const orderById = async (orderId) => {
    const orders = await Order.find({ _id: orderId });
    return { message: "success", orders };
};



module.exports = {
    addOrder,
    getOrders,
};

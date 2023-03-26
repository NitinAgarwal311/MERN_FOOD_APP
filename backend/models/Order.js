const mongoose = require('mongoose');

const {Schema} = mongoose;

const OrderSchema = Schema(
    {
        email: {
            type: String,
            required: true
        },
        orders: {
            type: Array,
            required: true
        }
    }
);

module.exports = mongoose.model('order', OrderSchema);
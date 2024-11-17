const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    },
    
    quantity: {
        type: Number,
        default: 1,
        min: 1 
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    token: {
        type: String, 
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const Order = mongoose.model('order', orderSchema);
module.exports = Order;

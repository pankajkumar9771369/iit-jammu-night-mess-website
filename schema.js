const joi = require('joi');

module.exports.orderSchema = joi.object({
    user: joi.string().required(),
    quantity: joi.number().min(1).required(), 
    totalPrice: joi.number().required(), 
    status: joi.string().valid('Pending', 'Processing', 'Completed', 'Cancelled').required(), 
    token: joi.string().required(), 
    createdAt: joi.date().timestamp().required(), 
});








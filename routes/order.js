const express = require('express');
const router = express.Router();
const Order = require('../models/order'); 
const { LogedIn } = require('../middleware'); 
const { v4: uuidv4 } = require('uuid'); 


router.get('/orders/new', LogedIn, (req, res) => {
    res.render('orders/new.ejs'); 
});


router.post('/orders/new', LogedIn, async (req, res) => {
    const { title, quantity, totalPrice } = req.body;

    try {
       
        if (!title || !quantity || !totalPrice) {
            req.flash('error', 'All fields are required');
            return res.redirect('/orders/new'); 
        }

       
        const newOrder = new Order({
            title,  
            quantity,
            totalPrice,
            token: generateToken(),
            status: 'Pending',
            createdAt: new Date()
        });

        
        await newOrder.save();

       
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating order");
    }
});



function generateToken() {
    return uuidv4(); 
}

// router.get("/order/id",LogedIn,async(req,res)=>{
//     res.render("orders/show.ejs")
// })
router.get('/order/show/:id', async (req, res) => {
    try {
        const orders = await Order.findById(req.params.id); 
        console.log(orders);  

        
        res.render('orders/show', { orders });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching order');
    }
});

module.exports = router;

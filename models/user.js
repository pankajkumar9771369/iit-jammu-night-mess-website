const mongoose = require('mongoose');
const { Schema } = mongoose;
const passpostLocalMongoose=require('passport-local-mongoose');
// Assuming that you have an Order model defined elsewhere
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address'] // Basic email format validation
    },
    // password: {
    //     type: String,
    //     required: true,
    //     minlength: 6
    // },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'order' // Reference to 'order' model
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
userSchema.plugin(passpostLocalMongoose);
// Export the User model
const User = mongoose.model('user', userSchema);
module.exports = User;

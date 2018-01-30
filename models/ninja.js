const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create ninja Schema & model
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    }
    // add in geo location
})

// Create model
const Ninja = mongoose.model('ninja', NinjaSchema)

module.exports = Ninja
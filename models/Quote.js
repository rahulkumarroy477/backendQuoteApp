const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
});

const Quote = mongoose.model("Quote",quoteSchema);
module.exports = Quote;
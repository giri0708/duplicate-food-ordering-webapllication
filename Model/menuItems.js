const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MenuItemsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    restaurantId: {
        type: String,
        required: true,
    },
    qty: {
        type:Number,
        required: true,
    }

});

module.exports = mongoose.model("MenuItems", MenuItemsSchema, "MenuItems");
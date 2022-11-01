const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    permalink: {
        type: String,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    short_content: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    },
    deleted_at: {
        type: Date,
    },
});

module.exports = mongoose.model("Blogs", schema);

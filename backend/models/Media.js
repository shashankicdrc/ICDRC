const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },

}, { timestamps: true });

mongoose.models = {};

const Media = mongoose.model('medias', schema)

module.exports = Media;
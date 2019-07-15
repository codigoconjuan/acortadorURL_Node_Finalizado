const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const urlSchema = new Schema({
    urlOriginal: {
        type: String,
        lowercase: true,
        trim: true,
        required: 'Agrega una URL'
    }, 
    urlCorta: {
        type: String
    }
});
// Métodos de mongoose
urlSchema.pre('save', async function(next) {
    // generar la URL corta
    this.urlCorta = shortid.generate();
    next();
});

module.exports = mongoose.model('Urls', urlSchema);
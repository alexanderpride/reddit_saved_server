const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let categorySchema = new Schema({
    name: {type: String, required: true},
    colour: {type: String, required: true},
    links: [{type: Schema.Types.ObjectID, ref: 'Link'}]
});

module.exports = mongoose.model('Category', categorySchema);
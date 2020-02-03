const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let linkSchema = Schema({
   postId: {type: String, required: true},
   dateAdded: {type: Date, required: true},
   content: {type: String, required: true},
   type: {type: String, required: true},
   link: {type: String, required: true}
});

module.exports = mongoose.model('Link', linkSchema);
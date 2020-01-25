const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {type: String, required: true},
    savedCategories: [{type: Schema.Types.ObjectID, ref: 'Category'}],
    accessToken: {type: String}
});

module.exports = mongoose.model('User', userSchema);
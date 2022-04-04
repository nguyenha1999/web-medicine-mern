var mongoose = require('mongoose');

var ResourceSchema = new mongoose.Schema({
    title: String,
    locationPath: {type: String, lowercase: true, trim: true, required: true},
    httpVerb: {type: String, uppercase: true, trim: true, required: true},
    api: Boolean,
    description: String,
    activated: Boolean,
    createdOn: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Resource', ResourceSchema);
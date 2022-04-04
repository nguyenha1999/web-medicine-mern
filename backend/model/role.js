var mongoose = require('mongoose');

var RoleSchema = new mongoose.Schema({
    title: String,
    activated: Boolean,
    description: String,
    frontends: [{type:mongoose.SchemaTypes.ObjectId, ref:'Frontend'}],
    backends: [{type:mongoose.SchemaTypes.ObjectId, ref:'Resource'}],
    createdOn: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model('Role', RoleSchema);
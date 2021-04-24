const mongoose = require('mongoose');

const RequestsSchema = new mongoose.Schema({
    type: {type: String, required: true, "enum": ["register"]},
    username: {type: String, required: true},
    token: {type: String, required: true}
});

const Requests = mongoose.model("requests", RequestsSchema);

module.exports = Requests;

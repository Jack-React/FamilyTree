const mongoose = require("mongoose");

const familySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    relations: [{person1: String, person2: String, relationship: String}]
});

var Family = module.exports = mongoose.model('family', familySchema);

module.exports.get = (callback, limit) => {
    Family.find(callback).limit(limit);
}

const mongoose = require("mongoose");

const familySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    relations: [{
        person1: {
            type: String,
            required: true
        },
        person2: {
            type: String,
            required: true
        },
        relationship: {
            type: String, 
            required: true
        }
    }]
});

var Family = module.exports = mongoose.model('family', familySchema);

module.exports.get = (callback, limit) => {
    Family.find(callback).limit(limit);
}

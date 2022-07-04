const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const vehicleSchema = new Schema(
    {
        brand: String,
        model: String,
        color: String,
        license: String
        
    }
);

const Vehicle = model("Vehicle", vehicleSchema);

module.exports = Vehicle;
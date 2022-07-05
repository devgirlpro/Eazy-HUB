const { Schema, model } = require("mongoose");


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
const { Schema, model } = require("mongoose");


const vehicleSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'lastname',
          },
        brand: String,
        model: String,
        color: String,
        license: String,
        available: Boolean    
    }   
);

const Vehicle = model("Vehicle", vehicleSchema);

module.exports = Vehicle;



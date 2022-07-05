const { Schema, model } = require("mongoose");


const vehicleSchema = new Schema(
    {
        Licenceplate: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'lastname',
          },
        brand: String,
        model: String,
        color: String,
        license: String
    }
);

const Vehicle = model("Vehicle", vehicleSchema);

module.exports = Vehicle;



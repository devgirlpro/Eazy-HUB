const {schema, modle} = require("mongoose");

const damageSchema = new schema( 
    {
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
      },
    description: String,
 } 
   )

   const Damage = model("Damage", damegeSchema);

   module.exports = Damage ;
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const alimentationItemsSchema = new Schema({
  owner_fk: { type: mongoose.ObjectId, ref: "Users" },
  name: String,
  id_openFoodFact: String,
});

const AlimentationItems = mongoose.model(
  "AlimentationItems",
  alimentationItemsSchema
);

const schema = Joi.object({
  owner_fk: Joi.string().min(2).max(30).required(),
  name: Joi.string().min(2).max(30).required(),
});

exports.AlimentationCycle = AlimentationItems;
exports.alimentationCycle = schema;

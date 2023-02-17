const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const alimentationCycleSchema = new Schema({
  owner_fk: { type: mongoose.ObjectId, ref: "Users" },
  name: String,
});

const AlimentationCycle = mongoose.model(
  "AlimentationCycle",
  alimentationCycleSchema
);

const schema = Joi.object({
  owner_fk: Joi.string().min(2).max(30).required(),
  name: Joi.string().min(2).max(30).required(),
});

exports.AlimentationCycle = AlimentationCycle;
exports.alimentationCycleSchema = schema;

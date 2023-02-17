const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const alimentationCycleItemsSchema = new Schema({
  owner_fk: { type: mongoose.ObjectId, ref: "Users" },
  alimentation_cycle_fk: { type: mongoose.ObjectId, ref: "AlimentationCycle" },
  name: String,
});

const AlimentationCycleItems = mongoose.model(
  "AlimentationCycleItems",
  alimentationCycleItemsSchema
);

const schema = Joi.object({
  owner_fk: Joi.string().min(2).max(30).required(),
  name: Joi.string().min(2).max(30).required(),
});

exports.AlimentationCycleItems = AlimentationCycleItems;
exports.alimentationCycleItemsSchema = schema;

const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const muscleCycleItemsSchema = new Schema({
  owner_fk: { type: mongoose.ObjectId, ref: "Users" },
  muscle_cycle_fk: { type: mongoose.ObjectId, ref: "MuscleCycle" },
  name: String,
});

const MuscleCycleItems = mongoose.model(
  "MuscleCycleItems",
  muscleCycleItemsSchema
);

const schema = Joi.object({
  owner_fk: Joi.string().min(2).max(30).required(),
  name: Joi.string().min(2).max(30).required(),
});

exports.MuscleCycleItems = MuscleCycleItems;
exports.muscleCycleItemsSchema = schema;

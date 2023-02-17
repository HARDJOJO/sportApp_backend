const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const muscleCycleSchema = new Schema({
  owner_fk: { type: mongoose.ObjectId, ref: "Users" },
  name: String,
});

const MuscleCycle = mongoose.model("MuscleCycle", muscleCycleSchema);

const schema = Joi.object({
  owner_fk: Joi.string().min(2).max(30).required(),
  name: Joi.string().min(2).max(30).required(),
});

exports.MuscleCycle = MuscleCycle;
exports.muscleCycle = schema;

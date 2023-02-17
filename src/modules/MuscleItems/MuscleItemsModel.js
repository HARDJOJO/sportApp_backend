const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const muscleItemsSchema = new Schema({
  owner_fk: { type: mongoose.ObjectId, ref: "Users" },
  name: String,
  weight: Number,
  repetition_per_session: Number,
  repetition_per_week: Number,
});

const MuscleItems = mongoose.model("MuscleItems", muscleItemsSchema);

const schema = Joi.object({
  owner_fk: Joi.string().min(2).max(30).required(),
  name: Joi.string().min(2).max(30).required(),
});

exports.MuscleItems = MuscleItems;
exports.muscleItems = schema;

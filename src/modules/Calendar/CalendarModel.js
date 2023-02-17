const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const calendarSchema = new Schema({
  owner_fk: { type: mongoose.ObjectId, ref: "Users" },
  name: String,
  start: String,
  end: String,
});

const Calendar = mongoose.model("Calendar", calendarSchema);

const schema = Joi.object({
  owner_fk: Joi.string().min(2).max(30).required(),
  name: Joi.string().min(2).max(30).required(),
});

exports.Calendar = Calendar;
exports.calendarSchema = schema;

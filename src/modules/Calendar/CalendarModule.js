const Model = require("./CalendarModel");
const Controller = require("./CalendarController");
const Repository = require("./CalendarRepository");

const provider = {
  Endpoint: "/calendar",
  Model,
  Controller,
  Repository,
};

module.exports = {
  Model,
  Repository,
  provider,
};

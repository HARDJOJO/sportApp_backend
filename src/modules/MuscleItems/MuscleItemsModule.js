const Model = require("./MuscleItemsModel");
const Controller = require("./MuscleItemsController");
const Repository = require("./MuscleItemsRepository");

const provider = {
  Endpoint: "/muscle_items",
  Model,
  Controller,
  Repository,
};

module.exports = {
  Model,
  Repository,
  provider,
};

const Model = require("./MuscleCycleItemsModel");
const Controller = require("./MuscleCycleItemsController");
const Repository = require("./MuscleCycleItemsRepository");

const provider = {
  Endpoint: "/muscle_cycle_Items",
  Model,
  Controller,
  Repository,
};

module.exports = {
  Model,
  Repository,
  provider,
};

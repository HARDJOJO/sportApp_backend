const Model = require("./AlimentationCycleItemsModel");
const Controller = require("./AlimentationCycleItemsController");
const Repository = require("./AlimentationCycleItemsRepository");

const provider = {
  Endpoint: "/alimentation_cycle_items",
  Model,
  Controller,
  Repository,
};

module.exports = {
  Model,
  Repository,
  provider,
};

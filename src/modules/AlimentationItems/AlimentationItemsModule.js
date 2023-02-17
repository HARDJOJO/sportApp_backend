const Model = require("./AlimentationItemsModel");
const Controller = require("./AlimentationItemsController");
const Repository = require("./AlimentationItemsRepository");

const provider = {
  Endpoint: "/alimentation_Items",
  Model,
  Controller,
  Repository,
};

module.exports = {
  Model,
  Repository,
  provider,
};

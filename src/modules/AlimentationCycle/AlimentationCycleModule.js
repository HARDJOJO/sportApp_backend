const Model = require("./AlimentationCycleModel");
const Controller = require("./AlimentationCycleController");
const Repository = require("./AlimentationCycleRepository");

const provider = {
  Endpoint: "/alimentation_cycle",
  Model,
  Controller,
  Repository,
};

module.exports = {
  Model,
  Repository,
  provider,
};

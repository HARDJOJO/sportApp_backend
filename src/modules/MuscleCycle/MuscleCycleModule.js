const Model = require("./MuscleCycleModel");
const Controller = require("./MuscleCycleController");
const Repository = require("./MuscleCycleRepository");

const provider = {
  Endpoint: "/muscle_cycle",
  Model,
  Controller,
  Repository,
};

module.exports = {
  Model,
  Repository,
  provider,
};

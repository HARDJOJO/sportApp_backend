const Model = require("./MuscleCycleItemsModel");
const Repository = require("./MuscleCycleItemsRepository");
const Logger = require("../../utils/Logger");

const Auth = require("../../utils/Auth");
const Router = require("express").Router();

Router.get("/", Auth, async (req, res) => {
  Logger.http(req, res);
  try {
    const result = await Repository.findMuscleCycleItemsByAny(req.body);
    Logger.success();

    return res.status(200).send(result);
  } catch (error) {
    Logger.error();

    return res.status(400).send();
  }
});

Router.get("/:id", Auth, async (req, res) => {
  Logger.http(req, res);

  try {
    const result = await Repository.findMuscleCycleItemsById(req.params.id);
    Logger.success();

    return res.status(200).send(result);
  } catch (error) {
    Logger.error();

    return res.status(400).send();
  }
});

Router.post("/", Auth, async (req, res) => {
  Logger.http(req, res);
  try {
    const validationResult = Model.muscleCycleItemsSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }
    const result = await Repository.createMuscleCycleItems(req.body);
    Logger.success();

    return res.status(201).send(result);
  } catch (error) {
    Logger.error();

    return res.status(400).send();
  }
});

Router.put("/:id", Auth, async (req, res) => {
  Logger.http(req, res);

  try {
    let result = await Repository.updateAnyMuscleCycleItemsValues(
      req.params.id,
      req.body
    );
    Logger.success();

    return res.status(201).send(result);
  } catch (error) {
    Logger.error();

    return res.status(400).send();
  }
});

Router.delete("/:id", Auth, async (req, res) => {
  Logger.http(req, res);

  try {
    let result = await Repository.deleteMuscleCycleItemsById(req.params.id);
    Logger.success();

    return res.status(204).send(result);
  } catch (error) {
    Logger.error();

    return res.status(400).send();
  }
});

module.exports = Router;

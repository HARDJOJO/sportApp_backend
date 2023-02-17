// const {Roles, rolesSchema} = require('./RoleModel')

const Model = require("./AlimentationCycleModel");

// UTILITY

const alimentationCycleAlreadyExist = async (role) => {
  const result = await Model.AlimentationCycle.find({ name: role });

  if (result.length > 0) return true;
  else return false;
};

// POST

const createRole = async (alimentationCycle) => {
  const resultAlimentationCycleName = await alimentationCycleAlreadyExist(
    alimentationCycle.name
  );
  let test = { ...alimentationCycle };
  const doc = new Model.AlimentationCycle(test);
  if (!resultAlimentationCycleName) {
    const result = await doc.save();

    return {
      status: "201",
      message: "Nouveau alimentation Cycle créer avec succès",
      result: result,
    };
  } else {
    return { status: "403", message: "alimentation Cycle déjà utilisé" };
  }
};

// GET

const regExQuery = async (value) => {
  let query = {};

  for (const key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      let element = value[key];

      if (typeof element === "string") {
        query[key] = { $regex: element, $options: "i" };
      } else {
        query[key] = element;
      }
    }
  }
  return query;
};

const findAlimentationCycleById = async (id) => {
  const result = await Model.AlimentationCycle.findById(id);

  return result;
};

const findAlimentationCycleByAny = async (alimentationCycle) => {
  const { limit, page } = alimentationCycle;

  const alimentationCycleRgx = await regExQuery(alimentationCycle);

  const result = await Model.AlimentationCycle.find(alimentationCycleRgx)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Model.AlimentationCycle.countDocuments();

  return {
    result: result,
    count: count,
  };
};

// UPDATE

const updateAnyAlimentationCycleValues = async (id, values) => {
  const result = await Model.AlimentationCycle.updateOne(
    { _id: id },
    {
      $set: values,
    }
  );

  return { result: result, values: values };
};

const deleteAlimentationCycleById = (id) => {
  Model.AlimentationCycle.deleteOne(id);
  return {};
};

module.exports = {
  createRole,
  findAlimentationCycleById,
  findAlimentationCycleByAny,
  updateAnyAlimentationCycleValues,
  deleteAlimentationCycleById,
};

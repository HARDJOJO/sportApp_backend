// const {Roles, rolesSchema} = require('./RoleModel')

const Model = require("./MuscleCycleModel");

// UTILITY

const muscleCycleAlreadyExist = async (role) => {
  const result = await Model.MuscleCycle.find({ name: role });

  if (result.length > 0) return true;
  else return false;
};

// POST

const createMuscleCycle = async (muscleCycle) => {
  const resultMuscleCycleName = await muscleCycleAlreadyExist(muscleCycle.name);
  let test = { ...muscleCycle };
  const doc = new Model.MuscleCycle(test);
  if (!resultMuscleCycleName) {
    const result = await doc.save();

    return {
      status: "201",
      message: "Nouveau MuscleCycle créer avec succès",
      result: result,
    };
  } else {
    return { status: "403", message: "MuscleCycle déjà utilisé" };
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

const findMuscleCycleById = async (id) => {
  const result = await Model.MuscleCycle.findById(id);

  return result;
};

const findMuscleCycleByAny = async (muscleCycle) => {
  const { limit, page } = muscleCycle;

  const muscleCycleRgx = await regExQuery(muscleCycle);

  const result = await Model.MuscleCycle.find(muscleCycleRgx)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Model.MuscleCycle.countDocuments();

  return {
    result: result,
    count: count,
  };
};

// UPDATE

const updateAnyMuscleCycleValues = async (id, values) => {
  const result = await Model.MuscleCycle.updateOne(
    { _id: id },
    {
      $set: values,
    }
  );

  return { result: result, values: values };
};

const deleteMuscleCycleById = (id) => {
  Model.MuscleCycle.deleteOne(id);
  return {};
};

module.exports = {
  createMuscleCycle,
  findMuscleCycleById,
  findMuscleCycleByAny,
  updateAnyMuscleCycleValues,
  deleteMuscleCycleById,
};

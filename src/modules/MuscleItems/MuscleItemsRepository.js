// const {Roles, rolesSchema} = require('./RoleModel')

const Model = require("./MuscleItemsModel");

// UTILITY

const muscleItemsAlreadyExist = async (role) => {
  const result = await Model.MuscleItems.find({ name: role });

  if (result.length > 0) return true;
  else return false;
};

// POST

const createMuscleItems = async (muscleItems) => {
  const resultMuscleItemsName = await muscleItemsAlreadyExist(muscleItems.name);
  let test = { ...muscleItems };
  const doc = new Model.MuscleItems(test);
  if (!resultMuscleItemsName) {
    const result = await doc.save();

    return {
      status: "201",
      message: "Nouveau MuscleItems créer avec succès",
      result: result,
    };
  } else {
    return { status: "403", message: "MuscleItems déjà utilisé" };
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

const findMuscleItemsById = async (id) => {
  const result = await Model.MuscleItems.findById(id);

  return result;
};

const findMuscleItemsByAny = async (muscleItems) => {
  const { limit, page } = muscleItems;

  const muscleItemsRgx = await regExQuery(muscleItems);

  const result = await Model.MuscleItems.find(muscleItemsRgx)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Model.MuscleItems.countDocuments();

  return {
    result: result,
    count: count,
  };
};

// UPDATE

const updateAnyMuscleItemsValues = async (id, values) => {
  const result = await Model.MuscleItems.updateOne(
    { _id: id },
    {
      $set: values,
    }
  );

  return { result: result, values: values };
};

const deleteMuscleItemsById = (id) => {
  Model.MuscleItems.deleteOne(id);
  return {};
};

module.exports = {
  createMuscleItems,
  findMuscleItemsById,
  findMuscleItemsByAny,
  updateAnyMuscleItemsValues,
  deleteMuscleItemsById,
};

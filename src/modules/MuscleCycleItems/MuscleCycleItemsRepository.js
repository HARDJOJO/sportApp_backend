// const {Roles, rolesSchema} = require('./RoleModel')

const Model = require("./MuscleCycleItemsModel");

// UTILITY

const muscleCycleItemsAlreadyExist = async (role) => {
  const result = await Model.MuscleCycleItems.find({ name: role });

  if (result.length > 0) return true;
  else return false;
};

// POST

const createMuscleCycleItems = async (muscleCycleItems) => {
  const resultMuscleCycleName = await muscleCycleItemsAlreadyExist(
    muscleCycleItems.name
  );
  let test = { ...muscleCycleItems };
  const doc = new Model.MuscleCycleItems(test);
  if (!resultMuscleCycleName) {
    const result = await doc.save();

    return {
      status: "201",
      message: "Nouveau MuscleCycleItems créer avec succès",
      result: result,
    };
  } else {
    return { status: "403", message: "MuscleCycleItems déjà utilisé" };
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

const findMuscleCycleItemsById = async (id) => {
  const result = await Model.MuscleCycleItems.findById(id);

  return result;
};

const findMuscleCycleItemsByAny = async (muscleCycleItems) => {
  const { limit, page } = muscleCycleItems;

  const muscleCycleRgx = await regExQuery(muscleCycleItems);

  const result = await Model.MuscleCycleItems.find(muscleCycleRgx)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Model.MuscleCycleItems.countDocuments();

  return {
    result: result,
    count: count,
  };
};

// UPDATE

const updateAnyMuscleCycleItemsValues = async (id, values) => {
  const result = await Model.MuscleCycleItems.updateOne(
    { _id: id },
    {
      $set: values,
    }
  );

  return { result: result, values: values };
};

const deleteMuscleCycleItemsById = (id) => {
  Model.MuscleCycleItems.deleteOne(id);
  return {};
};

module.exports = {
  createMuscleCycleItems,
  findMuscleCycleItemsById,
  findMuscleCycleItemsByAny,
  updateAnyMuscleCycleItemsValues,
  deleteMuscleCycleItemsById,
};

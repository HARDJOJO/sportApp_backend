// const {Roles, rolesSchema} = require('./RoleModel')

const Model = require("./AlimentationCycleItemsModel");

// UTILITY

const alimentationCycleItemsAlreadyExist = async (role) => {
  const result = await Model.AlimentationCycleItems.find({ name: role });

  if (result.length > 0) return true;
  else return false;
};

// POST

const createAlimentationCycleItems = async (alimentationCycleItems) => {
  const resultAlimentationCycleItemsName =
    await alimentationCycleItemsAlreadyExist(alimentationCycleItems.name);
  let test = { ...alimentationCycleItems };
  const doc = new Model.AlimentationCycleItems(test);
  if (!resultAlimentationCycleItemsName) {
    const result = await doc.save();

    return {
      status: "201",
      message: "Nouveau alimentation Cycle Items créer avec succès",
      result: result,
    };
  } else {
    return { status: "403", message: "alimentation Cycle Items déjà utilisé" };
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

const findAlimentationCycleItemsById = async (id) => {
  const result = await Model.AlimentationCycleItems.findById(id);

  return result;
};

const findAlimentationCycleItemsByAny = async (alimentationCycleItems) => {
  const { limit, page } = alimentationCycleItems;

  const alimentationCycleRgx = await regExQuery(alimentationCycleItems);

  const result = await Model.AlimentationCycleItems.find(alimentationCycleRgx)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Model.AlimentationCycleItems.countDocuments();

  return {
    result: result,
    count: count,
  };
};

// UPDATE

const updateAnyAlimentationCycleItemsValues = async (id, values) => {
  const result = await Model.AlimentationCycleItems.updateOne(
    { _id: id },
    {
      $set: values,
    }
  );

  return { result: result, values: values };
};

const deleteAlimentationCycleItemsById = (id) => {
  Model.AlimentationCycleItems.deleteOne(id);
  return {};
};

module.exports = {
  createAlimentationCycleItems,
  findAlimentationCycleItemsById,
  findAlimentationCycleItemsByAny,
  updateAnyAlimentationCycleItemsValues,
  deleteAlimentationCycleItemsById,
};

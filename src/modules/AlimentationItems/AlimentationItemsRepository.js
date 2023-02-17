// const {Roles, rolesSchema} = require('./RoleModel')

const Model = require("./AlimentationItemsModel");

// UTILITY

const alimentationItemsAlreadyExist = async (role) => {
  const result = await Model.AlimentationItems.find({ name: role });

  if (result.length > 0) return true;
  else return false;
};

// POST

const createRole = async (alimentationItems) => {
  const resultAlimentationItemsName = await alimentationItemsAlreadyExist(
    alimentationItems.name
  );
  let test = { ...alimentationItems };
  const doc = new Model.AlimentationItems(test);
  if (!resultAlimentationItemsName) {
    const result = await doc.save();

    return {
      status: "201",
      message: "Nouveau alimentation Items créer avec succès",
      result: result,
    };
  } else {
    return { status: "403", message: "alimentation Items déjà utilisé" };
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

const findAlimentationItemsById = async (id) => {
  const result = await Model.AlimentationItems.findById(id);

  return result;
};

const findAlimentationItemsByAny = async (alimentationItems) => {
  const { limit, page } = alimentationItems;

  const alimentationItemsRgx = await regExQuery(alimentationItems);

  const result = await Model.AlimentationCycle.find(alimentationItemsRgx)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Model.AlimentationItems.countDocuments();

  return {
    result: result,
    count: count,
  };
};

// UPDATE

const updateAnyAlimentationItemsValues = async (id, values) => {
  const result = await Model.AlimentationItems.updateOne(
    { _id: id },
    {
      $set: values,
    }
  );

  return { result: result, values: values };
};

const deleteAlimentationItemsById = (id) => {
  Model.AlimentationItems.deleteOne(id);
  return {};
};

module.exports = {
  createRole,
  findAlimentationItemsById,
  findAlimentationItemsByAny,
  updateAnyAlimentationItemsValues,
  deleteAlimentationItemsById,
};

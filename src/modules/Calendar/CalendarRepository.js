// const {Roles, rolesSchema} = require('./RoleModel')

const Model = require("./CalendarModel");

// UTILITY

const CalendarAlreadyExist = async (calendar) => {
  const result = await Model.Calendar.find({ name: calendar });

  if (result.length > 0) return true;
  else return false;
};

// POST

const createCalendar = async (calendar) => {
  const resultCalendarName = await CalendarAlreadyExist(calendar.name);
  let test = { ...calendar };
  const doc = new Model.Calendar(test);
  if (!resultCalendarName) {
    const result = await doc.save();

    return {
      status: "201",
      message: "Nouveau Calendar créer avec succès",
      result: result,
    };
  } else {
    return { status: "403", message: "Calendar déjà utilisé" };
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

const findCalendarById = async (id) => {
  const result = await Model.Calendar.findById(id);

  return result;
};

const findCalendarByAny = async (calendar) => {
  const { limit, page } = calendar;

  const calendarRgx = await regExQuery(calendar);

  const result = await Model.Calendar.find(calendarRgx)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Model.Calendar.countDocuments();

  return {
    result: result,
    count: count,
  };
};

// UPDATE

const updateAnyCalendarValues = async (id, values) => {
  const result = await Model.Calendar.updateOne(
    { _id: id },
    {
      $set: values,
    }
  );

  return { result: result, values: values };
};

const deleteCalendarById = (id) => {
  Model.Calendar.deleteOne(id);
  return {};
};

module.exports = {
  createCalendar,
  findCalendarById,
  findCalendarByAny,
  updateAnyCalendarValues,
  deleteCalendarById,
};

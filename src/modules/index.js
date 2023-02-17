const Auth = require("./Auth/AuthModule");
const Role = require("./Roles/RoleModule");
const User = require("./User/UserModule");

const AlimentationCycle = require("./AlimentationCycle/AlimentationCycleModule");
const AlimentationCycleItems = require("./AlimentationCycleItems/AlimentationCycleItemsModule");
const AlimentationItems = require("./AlimentationItems/AlimentationItemsModule");
const MuscleCycle = require("./MuscleCycle/MuscleCycleModule");
const MuscleCycleItems = require("./MuscleCycleItems/MuscleCycleItemsModule");
const MuscleItems = require("./MuscleItems/MuscleItemsModule");
const Calendar = require("./Calendar/CalendarModule");

const core = [
  Auth,
  Role,
  User,
  AlimentationCycle,
  AlimentationCycleItems,
  AlimentationItems,
  MuscleCycle,
  MuscleCycleItems,
  MuscleItems,
  Calendar,
];

module.exports = {
  core,
};

const { Signale } = require("signale");

const options = {
  disabled: false,
  interactive: false,
  logLevel: "info",
  scope: "",
  secrets: [],
  stream: process.stdout,
  types: {
    success: {
      badge: "✔️",
      color: "yellow",
      label: "",
      logLevel: "info",
    },
    error: {
      badge: "❗️",
      color: "red",
      label: "",
      logLevel: "error",
    },
    http: {
      badge: "📡",
      color: "gray",
      label: "",
      logLevel: "info",
    },
    invalidToken: {
      badge: "✋",
      color: "red",
      label: "",
      logLevel: "info",
    },
    unauthorized: {
      badge: "🚷",
      color: "red",
      label: "",
      logLevel: "info",
    },
  },
};

const custom = new Signale(options);

const http = (req) => {
  custom.http(
    `${new Date().toLocaleString()} | ${req.method} ${req.baseUrl}${req.url}`
  );
};
const success = () => {
  custom.success("Request response received successfully.");
};
const error = () => {
  custom.error("Request ended unsuccessfully.");
};
const invalidToken = () => {
  custom.invalidToken("Incorrect token.");
};
const unauthorized = () => {
  custom.unauthorized("Unauthorized request.");
};

const baseUrl = "http://192.168.174.150";

module.exports = { http, success, error, invalidToken, unauthorized, baseUrl };

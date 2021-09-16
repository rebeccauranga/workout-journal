"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var config = {
    user: process.env.DB_USER || "workoutuser",
    host: process.env.DB_HOST || "127.0.0.1",
    database: process.env.DB_NAME || "workouttracker",
    password: process.env.DB_PASSWORD || "123",
    port: parseInt(process.env.DB_PORT) || 5432,
};
Object.entries(config).forEach(function (entry) {
    console.log(entry);
    var key = entry[0], value = entry[1];
    if (!value) {
        var message = "PostgresConfig." + key + " is empty!";
        throw new Error(message);
    }
});
exports.default = new pg_1.Pool(config);

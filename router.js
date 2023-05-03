const express = require("express");
const controller = require("./controller.js")

const router = express.Router()

router.post("/users", controller.addUser) // serve POST requests to the "api/users" endpoint
router.get("/users", controller.getAllUsers) // serve GET requests to the "api/users" endpoint
router.post("/users/:_id/exercises", controller.addExercise) // serve POST requests to the "/api/users/:_id/exercises" endpoint
router.get("/users/:_id/logs", controller.sendUserLogs) // serve GET requests to the "users/:_id/logs" endpoint


module.exports = router;
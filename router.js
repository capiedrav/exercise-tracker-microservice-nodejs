const express = require("express");
const {addUser, getAllUsers, addExercise} = require("./controller.js")

const router = express.Router()

router.post("/users", addUser) // serve POST requests to the "api/users" endpoint
router.get("/users", getAllUsers) // serve GET requests to the "api/users" endpoint
router.post("/users/:_id/exercises", addExercise) // serve POST requests to the "/api/users/:_id/exercises" endpoint

module.exports = router;
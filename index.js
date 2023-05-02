const express = require('express')
const app = express()
const cors = require('cors')
const apiRouter = require("./router.js")
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended: false})); // "body parser" middleware for handling form data
app.use("/api", apiRouter) // apiRouter handles requests to the "/api" endpoint

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});







const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

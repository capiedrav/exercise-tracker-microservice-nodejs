const db = require("./model.js") // functions for handling the database

function addUser(request, response){
  // adds a user to the database
  
  const username = request.body.username // extract username from the form

  if(username){ // add user to the database
    response.json(db.saveUser(username));
  }
  else{
    response.json({error: "invalid username"});
  }
}

function getAllUsers(request, response){
  // retrieve all users from the database

  response.json(db.getAllUsers());
}

function addExercise(request, response){
  // adds an exercise to the database
  
  const newExercise = { // get info from the form fields
    _id: request.params._id, // get _id from the url, because it can't be taken from the form. in the form it is named ":_id" and the ":" can be use in an attribute name    
    description: request.body.description,
    duration: parseInt(request.body.duration),
    date: request.body.date
  };

  // add exercise to the database
  response.json(db.saveExercise(newExercise));
  
}

module.exports = {addUser, getAllUsers, addExercise};

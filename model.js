const {v4: uuid4} = require("uuid"); // v4 function as uuid4

let database = {users: [], exercises: []};


function saveUser(username){
  // add user to the database
  
  const newUser = {username: username, _id: uuid4()}; // create user
  database.users.push(newUser); // add it to the database

  return newUser; // return new user entry
}

function getAllUsers(){
  // returns all users in the database
  
  return database.users
}


function saveExercise(formFields){
  // saves an exercise entry in the database.

  // verify that the userId belongs to an user in the database
  const user = database.users.filter(user => user._id === formFields._id)[0]

  if(user){ // user found in the database
    const newExercise = { // new exercise entry
      username: user.username,
      description: formFields.description,
      duration: formFields.duration,
      /*
      if formFields.date is defined, change it from "yyyy-mm-dd" to date string format
      otherwise, take current date and convert it to date string format
      */      
      date: formFields.date ? new Date(formFields.date).toDateString() : new Date().toDateString(),
      _id: formFields._id      
    }
    
    database.exercises.push(newExercise); // save exercise to the database

    return newExercise; // return new exercise entry
  }
  else{ // user not found in the database
    return {error: `Error!! user with _id ${formFields._id} not found in the database`}
  }
}


function getUserExercises(userId){
  // returns the exercises of user identified by userId
  
  // verify that the user is in the database
  const user = database.users.filter(user => user._id === userId)[0];
  if (user){ // if user is in the database
    // retrieve all exercises of user 
    const userExercises = database.exercises.filter(user => user._id === userId) 
  
    let userData = { // contains info about the user and his exercises
      username: userExercises[0].username,
      count: userExercises.length,
      _id: userId
    }
  
    let log = [] // stores info about the exercises
  
    for (let exercise of userExercises){
      log.push({ // append info about each exercise
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date
      });
    }
  
    userData.log = log; // add exercises info to userData object

    return userData;  
  }
  else{
    return {error: `Error!! user with _id ${userId} not found in the database`}
  }
  
  
}

module.exports = {saveUser, getAllUsers, saveExercise, getUserExercises};

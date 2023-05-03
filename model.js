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

function getExercisesBetweenDates(userId, dateQueries){
  // helper function that returns the exercises of a user according to "dateQueries"

  const from = new Date(dateQueries.from).getTime(); // "from" in milliseconds
  const to = new Date(dateQueries.to).getTime(); // "to" in milliseconds
  const limit = parseInt(dateQueries.limit); // "limit" as an int
  let exercises = [];
  
  if (!(isNaN(from) || isNaN(to) || isNaN(limit))){ // if the values of the variables are o.k.
    
    exercises = database.exercises.filter(exercise => exercise._id === userId) // get exercises of user with id == userId
                .filter(exercise => from >= new Date(exercise.date).getTime() && to <= new Date(exercise.date).getTime()) // filter those exercises by date 

    exercises = exercises.slice(0, limit); // limit the number of exercises to get
  
  }

  return exercises;
  
}


function getUserExercises(userId, dateQueries = undefined){
  // returns the exercises of user identified by userId
  
  let userExercises = undefined;
  
  // verify that the user is in the database
  const user = database.users.filter(user => user._id === userId)[0];
  
  if (user){ // if user is in the database
    
    if (dateQueries){ // get exercises between dates
      userExercises = getExercisesBetweenDates(userId, dateQueries);
    }
    else{ // get all exercises of user      
      userExercises = database.exercises.filter(exercise => exercise._id === userId)      
    }     
  
    let userData = { // contains info about the user and his exercises
      username: user.username,
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

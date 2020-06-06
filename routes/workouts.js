const { Workout } = require('../models')
const router = require('express').Router()
// /api/workouts Routes

// GET Get All workouts
// Get all the workouts from the database
// Loop over them and calculate the total Duration
//   Send all the workouts as json
router.get('/', (req, res, next) => {
  Workout.find({})
    .then(workouts => {
      workouts.forEach(workout => {
        let totalTime = 0
        workout.exercises.forEach(exercise => {
          totalTime += exercise.duration
        })
        workout.totalDuration = totalTime
      })
      res.json(workouts)
    })
    .catch(next)
})

// POST a new workout
// Create a new instance of workout
// Save it, then send the new workout back to the client
router.post('/', (req, res, next) => {
  const newWorkout = new Workout(req.body)
  newWorkout
    .save()
    .then(dbWorkout => res.status(201).json(dbWorkout))
    .catch(next)
})

// Update the last workout by its id
// Find the workout with that id, push the new exercise into the exercises array
// Send the update workout back to the client
router.put('/:id', async (req, res, next) => {
  try {
    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body } },
      { new: true }
    )
    res.json(updatedWorkout)
  } catch (error) {
    next(error)
  }
})

// View Stats for all the workouts
// Redirect to the get all route
router.get('/range', (req, res, next) => {
  res.status(307).redirect('/api/workouts')
})

module.exports = router

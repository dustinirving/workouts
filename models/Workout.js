const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
  date: Date,
  exercises: [
    {
      name: String,
      type: String,
      weight: Number,
      sets: Number,
      reps: Number,
      duration: Number,
      distance: Number
    }
  ]
})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout

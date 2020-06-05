const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const db = require('./models')
const path = require('path')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const app = express()

app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// app.use(require('./routes/workouts.js'))

// app.get('/exercise', function (req, res) {
//   res.sendFile(path.join(__dirname, './public/exercise.html'))
// })

// Routes
// /api/workouts GET last workout
app.get('/api/workouts', (req, res, next) => {
  db.Workout.find({})
    .then(workouts => {
      for (let workout of workouts) {
        for (let exercise of workout.exercises) {
          console.log(exercise.duration)
        }
      }
      res.json(workouts)
    })
    .catch(next)
})

// POST a new workout
app.post('/api/workouts', (req, res, next) => {
  const newWorkout = new db.Workout(req.body)
  newWorkout
    .save()
    .then(dbWorkout => res.status(201).json(dbWorkout))
    .catch(next)
})

// /api/workouts POST
// /api/workouts/:id PUT
// /api/workouts/range GET

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))

// Requiring express to set up the server
const express = require('express')
// Require morgan for debugging
const logger = require('morgan')
// Require mongoose to connect to the database
const mongoose = require('mongoose')
// Require path to make the absolute path relative
const path = require('path')

// Connect to the databse in MongoDB with the specified conditions
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

// Setting up the express app
const app = express()

// Use logger from morgan for debugging
app.use(logger('dev'))
// Let the Express App to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Allow the static resources to be served up on the client
app.use(express.static('public'))

// Use api workouts module with the api workout routes
app.use('/api/workouts', require('./routes/workouts.js'))

// Send the exercise html file
app.get('/exercise', (req, res, next) => {
  res.sendFile(path.join(__dirname, './public/exercise.html'))
})
// Send hte stats html file
app.get('/stats', (req, res, next) => {
  res.sendFile(path.join(__dirname, './public/stats.html'))
})

// Listen on PORT 300
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))

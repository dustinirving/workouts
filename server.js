const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const db = require('./models')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workoout', {
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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))

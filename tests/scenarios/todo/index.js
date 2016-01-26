'use strict'
let db = 'db'

let app = require('./../../../src/highland.js')()

app.use({
  entry: require('./todo-module'),
  route: '/todo',
  dependencies: {
    db: db
  }
})

app.listen()

module.exports = app

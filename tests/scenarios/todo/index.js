'use strict'
let db 

require('./../../mocks/database.mock').build().initialize((err, dbInstance) => {
    db = dbInstance
})

let app = require('./../../../src/highland.js')()

app.use({
  entry: require('./todo-module'),
  route: '/tasks',
  dependencies: {
    db: db
  }
})

app.listen()

module.exports = app

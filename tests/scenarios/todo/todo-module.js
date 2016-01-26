'use strict'
const mod = require('./../../../src/builders/module')

let db = 'db'

let todo = mod({
    controller: require('./todo-controller'),
    routes: require('./todo-routes'),
    model: '',
    dependencies: {
        db: db
    }
})

module.exports = todo
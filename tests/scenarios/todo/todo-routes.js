'use strict'
const routes = require('./../../../src/builders/routes')
const todo = require('./todo-module')

let todoRoutes = routes({
  routes: definition
})

function definition (request, response) {
  const router = require('./../../../src/router/router')
  todo.controller.setTransaction(request, response)
  
  router
    .when('POST', '/module', request, todo.controller.save)
    .when('PUT', '/module/:id', request, todo.controller.update)
    .when('DELETE', '/module/:id', request, todo.controller.remove)
    .when('GET', '/module/:id', request, todo.controller.get)
    .when('GET', '/module', request, todo.controller.query)
    .when('OPTIONS', '/module/:id', request, todo.controller.options)
    .when('GET', '/', request, todo.controller.forbidden)
    .end()
}

module.exports = todoRoutes
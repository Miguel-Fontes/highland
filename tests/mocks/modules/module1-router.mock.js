'use strict'
let routes = (function mockRouter (spec, my) {
  let router = require('./../../../src/router/router')
  let that = { }

  spec = spec || { }
  my = my || { }

  my.routes = spec.routes || routes 
  that.routes = getRoutes

  function getRoutes () {
    return my.routes
  }

  function routes (request, response) {
    console.log('Mock Router 1 -> Request: METHOD:', request.method, ' - URL:', request.url)
    
    spec.ctrl.setTransaction(request, response)
     
    router
      .when('POST', '/module', request, spec.ctrl.save)
      .when('PUT', '/module/:id', request, spec.ctrl.update)
      .when('DELETE', '/module/:id', request, spec.ctrl.remove)
      .when('GET', '/module/:id', request, spec.ctrl.get)
      .when('GET', '/module', request, spec.ctrl.query)
      .when('OPTIONS', '/module/:id', request, spec.ctrl.options)
      .when('GET', '/', request, spec.ctrl.forbidden)
      .end()
  }

  return that
})

module.exports = routes

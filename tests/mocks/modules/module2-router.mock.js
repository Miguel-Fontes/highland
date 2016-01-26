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
    console.log('Mock Router 2 -> Request: METHOD:', request.method, ' - URL:', request.url)
    
    spec.ctrl.setTransaction(request, response)
     
    router
      .when('POST', '/mod2', request, spec.ctrl.save)
      .when('PUT', '/mod2/:id', request, spec.ctrl.update)
      .when('DELETE', '/mod2/:id', request, spec.ctrl.remove)
      .when('GET', '/mod2/:id', request, spec.ctrl.get)
      .when('GET', '/mod2', request, spec.ctrl.query)
      .when('OPTIONS', '/mod2/:id', request, spec.ctrl.options)
      .when('GET', '/', request, spec.ctrl.forbidden)
      .end()
  }

  return that
})

module.exports = routes

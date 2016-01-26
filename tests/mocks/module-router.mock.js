'use strict'
let routes = (function mockRouter (spec, my) {
  let router = require('./../../src/router/router')
  let that = { }

  spec = spec || { }
  my = my || { }

  my.routes = spec.routes || routes 
  that.routes = getRoutes
  
  that.spec = spec
  that.my = my

  function getRoutes () {
    return my.routes
  }

  function routes (request, response) {
    console.log('Mock Router -> Request: METHOD:', request.method, ' - URL:', request.url)
    
    spec.ctrl.setTransaction(request, response)
     
    router
      .when('POST', '/mod', request, spec.ctrl.save)
      .when('PUT', '/mod/:id', request, spec.ctrl.update)
      .when('DELETE', '/mod/:id', request, spec.ctrl.remove)
      .when('GET', '/mod/:id', request, spec.ctrl.get)
      .when('GET', '/mod', request, spec.ctrl.query)
      .when('OPTIONS', '/mod/:id', request, spec.ctrl.options)
      .when('GET', '/', request, spec.ctrl.forbidden)
      .end()
  }

  return that
})

module.exports = routes

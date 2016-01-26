'use strict'
let routes = (function routes (spec, my) {
  let that = {}

  const router = require('./../router/router')

  // TODO: valudar parâmetros
  spec = spec || {}
  my = my || {}

  my.routes = route || {}

  function route (request, response) {
    for (let route in spec.routes) {
      for (let method in spec.routes[route]) {
        router
          .when(method, route, request, () => {
            my.controller[spec.routes[route][method]](request, response, my.dependencies)
          })
      }
    }
    router.end()
  }

  that.get = () => {
    return my.routes
  }

  return that
})

module.exports = routes

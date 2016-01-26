'use strict'
let mod = (function (spec, my) {
  let that = {}

  spec = spec || {}
  my = my || {}

  // TODO: Validar se spec.controller e spec.routes são funções
  // TODO: Validar estrutura dos objetos, se necessário
  my.dependencies = spec.dependencies || {}
  my.controller = spec.controller || {}
  my.routes = spec.routes || {}
  my.model = spec.model || {}

  initialize()

  // API
  that.controller = my.controller
  that.routes = my.routes // that.routes = my.router.routes()
  // that.router = my.router.hasOwnProperty('routes') ? my.router.routes : my.router

  function initialize () {
    my.controller = typeof my.controller === ('function')
      ? my.controller({}, {dependencies: my.dependencies})
      : my.controller

    my.routes = typeof my.routes === ('function')
      ? my.routes({}, {dependencies: my.dependencies})
      : my.routes
  }

  return that
})

module.exports = mod

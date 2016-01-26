'use strict'
let mod = (function (spec, my) {
  let that = {}

  spec = spec || {}
  my = my || {}

  // TODO: Validar se spec.controller e spec.router são funções
  // TODO: Validar estrutura dos objetos, se necessário
  my.dependencies = spec.dependencies || {}
  my.controller = spec.controller || {}
  my.router = spec.router || {}
  my.model = spec.model || {}

  initialize()

  // API
  that.controller = my.controller
  that.router = my.router // that.routes = my.router.routes()
  //that.router = my.router.hasOwnProperty('routes') ? my.router.routes : my.router
    
  function initialize () {
    my.controller = typeof my.controller === ('function')
      ? my.controller({}, my.dependencies)
      : my.controller

    my.router = typeof my.router === ('function')
      ? my.router({}, my.dependencies)
      : my.router
  }

  return that
})

module.exports = mod

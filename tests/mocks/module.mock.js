'use strict'
let mod = (function (spec, my) {
  let that = {}

  spec = spec || {}
  my = my || {}
  
  my.ctrl = require('./controller.mock.js')()
  my.router = require('./module-router.mock.js')({ ctrl: my.ctrl, routes: spec.routes || '' })

  that.routes = my.router.routes()

  return that
})

module.exports = mod

'use strict'
let mod = (function (spec, my) {
  let that = {},
    router = require('./../../src/router/router')

  spec = spec || {}
  my = my || {}
  
  my.ctrl = require('./controller.mock.js')
  my.router = require('./module-router.mock.js')({ ctrl: my.ctrl })

  that.routes = my.router.routes()

  return that
}())

module.exports = mod

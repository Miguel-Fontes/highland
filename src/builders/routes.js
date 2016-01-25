'use strict'
let routes = (function routes (spec, my) {
  let that = {}

  spec = spec || {}
  my = my || {}

  my.routes = spec.routes || {}
  my.dependencies = spec.dependencies || {}

  that.routes = () => {
    return my.routes
  }

  return that
})

module.exports = routes

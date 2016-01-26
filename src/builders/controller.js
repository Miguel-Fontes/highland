'use strict'
let controller = (function controller (spec, my) {
  let that = {}

  // TODO: Validar argumentos da funçao
  spec = spec || {}
  my = my || {}

  that.initialize = spec.initialize || notFound
  that.remove = spec.remove || notFound
  that.query = spec.query || notFound
  that.update = spec.update || notFound
  that.get = spec.get || notFound
  that.options = spec.options || notFound
  that.save = spec.save || notFound
  that.forbidden = spec.forbidden || notFound

  // TODO: Esta função deve escrever no response.
  function notFound (request, response) {
    response.writeHead(404)
    response.write('Not supported action')
    response.end()
  }

  return that
})

module.exports = controller

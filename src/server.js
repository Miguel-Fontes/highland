'use strict'
let server = (function (spec, my) {
  // Requires
  const http = require('http')

  // TODO: Tratar erros de falta de informações no spec
  // spec == { hostname: string, port: string, routes: function}
  spec = spec || { }
  my = my || { }

  my.hostname = spec.hostname
  my.port = spec.port
  my.server = http.createServer(spec.routes)

  let that = {}

  // Api
  that.initialize = initialize
  that.getHttp = getHttp
  that.stop = stop
  that.routes = spec.routes

  // Inicialização
  function initialize (callback) {
    my.server.on('error', function (e) {
      callback(new Error('Erro no servidor http! - ' + e), that)
    })

    my.server.on('close', function () {
      callback(null, that)
    })

    my.server.listen(my.port, my.hostname, function () {
      callback(null, that)
    })
  }

  // Funções
  // TODO: Verificar se é realmente necessário retornar esta informação
  function getHttp () {
    return my.server
  }

  function stop () {
    my.server.close()
  }

  return that
})

module.exports = server

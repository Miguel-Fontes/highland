'use strict'
let server = (function (spec, my) {
  // Requires
  const http = require('http')

  // TODO: Tratar erros de falta de informações no spec
  // spec == { hostname: string, port: string, routes: function}
  spec = spec || { }
  my = my || { }

  my.hostname = spec.hostname || 'localhost'
  my.port = spec.port || '8080'
  my.server = http.createServer(spec.routes)

  let that = {}

  // Api
  that.initialize = initialize
  that.getServer = getServer
  that.stop = stop

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
  function getServer () {
    return my.server
  }

  function stop () {
    my.server.close()
  }

  return that
})

module.exports = server

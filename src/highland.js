'use strict'
let highland = (function (spec, my) {
  // http
  // modulos
  // controllers
  // database
  // TODO: Como fazer com Databases?

  const server = require('./server')
  const router = require('./router/router')

  let that = {}

  spec = spec || {}
  my = my || {}
  my.http = {}
  my.modules = []

  // API
  that.use = use
  that.http = http
  that.listen = listen
  that.stop = stop

  // { module: function, route: string <module-name>, config: {hostname: string || <localhost>, port: string <8080>} }
  function use (module) {
    my.modules.push(module)
    return that
  }

  function http () {
    return my.http
  }

  function stop () {
    my.http.stop()
  }

  // config: {hostname: string || <localhost>, port: string <8080>}
  function listen (config) {
    // TODO: Validar parâmetros e definir valores detault 
    config = config || {}
    config.hostname = config.hostname || 'localhost'
    config.port = config.port || '8080'

    // TODO: Validar a possibilidade de chamar Listen sem nenhum módulo configurado
    // TODO: Construir rotas padrão de acordo com informações do módulo.
    my.routes = (rq, rs) => {
      my.modules.forEach((module) => {
        router
          .all('/' + module.route, rq, rs, module.routes)
          .end()
      // TODO: Implementar 'Otherwise'. Se não deu match em nenhuma rota, manda um 404.
      })
    }

    config.routes = my.routes

    my.http = server(config)
    my.http.initialize((err, http) => {
      console.log('Listening at ' + config.hostname + ':' + config.port)
    })

    return that
  }

  return that
})

module.exports = highland

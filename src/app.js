'use strict'
let highland = (function (spec, my) {
  // http
  // modulos
  // controllers
  // database

  spec = spec || {}
  my = my || {}

  let that = {}

  const server = require('./server')
  const router = require('./router').build()

  my.modules = []

  // { module: function, route: string <module-name>, config: {hostname: string || <localhost>, port: string <8080>} }
  that.use = function (module) {
    my.modules.push(module)
    return that
  }

  // config: {hostname: string || <localhost>, port: string <8080>}
  that.listen = function (config) {
    
    // TODO: Validar parâmetros e definir valores detault 
    config = config || {}
    config.hostname = config.hostname || 'localhost'
    config.port = config.port || '8080'
      
    // TODO: Construir rotas padrão de acordo com informações do módulo.
    my.routes = (rq, rs) => {
      my.modules.forEach((module) => {
        router
          .all('/' + module.route, module.routes(rq, rs))
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

  // TODO: Como fazer com Databases?

  return that
})

module.exports = highland

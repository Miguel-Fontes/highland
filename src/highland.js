'use strict'
let highland = (function (spec, my) {
  const server = require('./server')
  const router = require('./router/router')
  const controller = require('./builders/controller')
  const routes = require('./builders/routes')
  const module = require('./builders/module')

  let that = { }

  spec = spec || { }
  my = my || { }
  my.http = { }
  my.modules = []

  // API
  that.use = use
  that.http = http
  that.listen = listen
  that.stop = stop

  // builders: construtores de objetos para facilitar o trabalho do usuário
  that.controller = controller
  that.module = module
  that.routes = routes

  // { module: function, route: string <module-name>, dependencies: { ... } ,  }
  function use (module) {
    let resolved = module

    if (module.hasOwnProperty('dependencies')) {
      resolved.entry = (module.dependencies) ? module.entry(module.dependencies) : module.entry()
    } else {
      resolved.entry = module.entry()
    }

    my.modules.push(resolved)

    return that
  }

  function http () {
    return my.http
  }

  function stop () {
    my.http.stop()
    return that
  }

  // config: {hostname: string || <localhost>, port: string <8080>}
  function listen (config) {
    // TODO: Validar parâmetros e definir valores detault 
    config = config || {}
    config.hostname = config.hostname || 'localhost'
    config.port = config.port || '8080'

    // TODO: Validar a possibilidade de chamar Listen sem nenhum módulo configurado
    // TODO: Construir rotas padrão de acordo com informações do módulo.
    my.routes = ((rq, rs) => {
      my.modules.forEach((module) => {
        router
          .all(module.route, rq, rs, module.entry.routes)
          .end()
      // TODO: Implementar 'Otherwise'. Se não deu match em nenhuma rota, manda um 404.
      })
    })

    config.routes = my.routes

    my.http = server(config)
    my.http.initialize((err, http) => {
      return that
    })

    return that
  }

  return that
})

module.exports = highland

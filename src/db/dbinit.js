'use strict'
let commonDB = function (spec, my) {
  // TODO: Tratamento de erros para o caso das configurações não existirem
  // SPEC = { config: {   }, env: string, callback: function }

  var dbModule,
    dbConfig

  spec = spec || { }
  my = my || { }

  dbModule = spec.config.env[spec.env].db,
  dbConfig = (dbModule in spec.config.db ? spec.config.db[dbModule][spec.env] : { })

  // Lógica de inicialização do Database está encapsulada dentro do próprio objeto do DB
  // passo à frente o callback.
  require('./' + dbModule)
    .build(dbConfig)
    .initialize(spec.callback)
}

module.exports = commonDB
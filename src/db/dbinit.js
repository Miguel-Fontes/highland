'use strict'
let dbInit = function (spec, my) {
  // TODO: Tratamento de erros para o caso das configurações não existirem
  // SPEC = { config: { }, env: string,  }
  
  var dbModule = spec.config.env[env].db,
    dbConfig = (dbModule in spec.config.db ? spec.config.db[dbModule][env] : { })
    
   spec = spec || { }
   my = my || { }

  // Lógica de inicialização do Database está encapsulada dentro do próprio objeto do DB
  // passo à frente o callback. O retorno pro callback será err e o database.
  require('./' + dbModule)
    .build(dbConfig)
    .initialize(spec.callback)
}

module.exports = dbInit

'use strict'
let app = (function(spec, my) {
    // http
    // modulos
    // controllers
    // database
    
    spec = spec || {}
    my = my || {}
    
    let that = {}
    
    my.modules = []
    
    that.use = function(module) {
        my.modules.push(module)
    }
    
    return that   
}())


module.exports = app
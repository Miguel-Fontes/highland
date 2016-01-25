'use strict'
let router = (function Router (spec, my) {
  // var log = require('./log').log
  let matched = false,
    that = {}

  spec = spec || { }
  my = my || { }

  // API
  that.when = when
  that.end = end
  that.all = all
  // Funcionalidades

  function all (pattern, request, response, callback) {
    if (!matched) {
      if (validatePattern(pattern, request, true)) {
        callback(request, response)
        // Marco como true para que não sejam avaliados mais padroes
        matched = true
      }
    }
    // Chainning Cleverness
    return that
  }

  function when (method, pattern, request, callback) {
    // Primeiro verifica o método que é o mais rápido, na boa
    if (validMethod() && !matched) {
      if (validatePattern(pattern, request, false)) {
        callback()
        // Marco como true para que não sejam avaliados mais padroes
        matched = true
      }
    }

    function validMethod () {
      // Implementar o método ALL aqui
      return method == request.method ? true : false
    }

    // Chainning Cleverness
    return that
  }

  function end () {
    // Nesta função, resetar a condição do router.
    matched = false
  }

  function validatePattern (urlPattern, request, fast) {
    var patternSplit = '',
      requestUrlSplit = '',
      parsedPatternUrl = urlPattern,
      requestUrl = request.url

    request.params = {}

    validateArguments()

    // log('Validação do Pattern', urlPattern, 'com a URL do request', requestUrl)

    // TODO: validar se url é string. Caso negativo, retornar erro.
    patternSplit = urlPattern.split('/').filter(isBlank)
    requestUrlSplit = requestUrl.split('/').filter(isBlank)

    if (fast && patternSplit[0] == requestUrlSplit[0]) {
      return true
    }

    // Validação do tamanho dos Arrays. Se não for igual significa que a URL não se encaixa no Pattern.
    // Vou retornar ''. Isto fará com que a URL nunca se encaixe no Pattern.
    if (patternSplit.length != requestUrlSplit.length && !fast) {
      // log('O tamanho dos arrays é diferente. Não é deste pattern (', urlPattern , '): ', urlSplit.length, '!=', requestUrlSplit.length)
      return false
    }

    // Crio um objeto javascript com os parâmetros e a posição do bloco para efetuar o
    // Matching de valores posteriormente.
    patternSplit.forEach(buildParams)

    // log('URL para Matching', parsedPatternUrl)
    // log('request url', requestUrl)
    return parsedPatternUrl == requestUrl

    function isBlank (value, index, array) {
      if (value != '') {
        return true
      }
    }

    function buildParams (value, index, array) {
      if (value.contains(':')) {
        parsedPatternUrl = parsedPatternUrl.replace(value, requestUrlSplit[index])
        request.params[value.replace(':', '')] = requestUrlSplit[index]
      }
    }

    function validateArguments () {
      // if (typeof (urlSplit) != string) { return false }
      // if (typeof (urlSplit) != string) { return false }
    }
  }

  return that

}())

// Prototypes ----------------------------------------------
String.prototype.contains = function (char) {
  var value = this.toString()
  return value.match(char) != undefined ? true : false
}
// ---------------------------------------------------------

module.exports = router

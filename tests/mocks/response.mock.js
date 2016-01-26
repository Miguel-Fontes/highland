module.exports = (function response (callback) {
  return {
    end: callback,
    writeHead: writeHead,
    write: write
  }

  function writeHead () {
    return true
  }

  function write () {
    return true
  }

})

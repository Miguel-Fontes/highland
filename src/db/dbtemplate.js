'use strict'
let dbImplementation = (spec, my) => {
  let that = { }

  config = config || { }
  my = my || { }

  // API
  that.initialize = initialize
  that.save = save
  that.get = get
  that.query = query
  that.update = update
  that.remove = remove

  function initialize (id, callback) {}
  function remove (id, callback) {  }
  function query (callback) { }
  function update (obj, callback) {  }
  function get (id, callback) { }
  function save (obj, callback) { }

  return that
}

module.exports = dbImplementation

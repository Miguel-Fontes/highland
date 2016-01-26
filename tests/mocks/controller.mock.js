module.exports = (function ctrlMock (spec, my) {
  var rq, rs

  return {
    initialize: function () {  return 'initialize' },
    remove: function () {  rs.end('remove') },
    query: function () { rs.end('query')  },
    update: function () {  rs.end('update') },
    get: function () {  rs.end('get') },
    options: function () {  rs.end('options')  },
    save: function () {  rs.end('save')   },
    forbidden: function () {  rs.end('forbidden') },
    setTransaction: setTransaction,
    spec: spec,
    my: my
  }

  function setTransaction (req, res) {
    rq = req
    rs = res
  }
})
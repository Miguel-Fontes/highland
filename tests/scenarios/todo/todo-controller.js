'use strict'

let controller = {
  initialize: function (rq, rs) {  return 'initialize' },
  remove: function (rq, rs) {  rs.end('remove') },
  query: function (rq, rs) { rs.end('query')  },
  update: function (rq, rs) {  rs.end('update') },
  get: function (rq, rs) {  rs.end('get') },
  options: function (rq, rs) {  rs.end('options')  },
  save: function (rq, rs) {  rs.end('save')   },
  forbidden: function (rq, rs) {  rs.end('forbidden') }
}

module.exports = controller

'use strict'
const controller = require('./../../../src/builders/controller')

let todoCtrl = controller({
  initialize: function (params, rq, rs) {  return 'initialize' },
  remove: function (params, rq, rs) {  rs.end('remove') },
  query: function (params, rq, rs) { rs.end('query')  },
  update: function (params, rq, rs) {  rs.end('update') },
  get: function (params, rq, rs) {  rs.end('get') },
  options: function (params, rq, rs) {  rs.end('options')  },
  save: function (params, rq, rs) {  rs.end('save')   },
  forbidden: function (params, rq, rs) {  rs.end('forbidden') }
})

module.exports = todoCtrl

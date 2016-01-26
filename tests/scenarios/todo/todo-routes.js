'use strict'

let routes = {
  '/todo': {
    get: 'query',
    post: 'save'
  },
  '/todo/:id': {
    put: 'update',
    delete: 'remove',
    get: 'get',
    options: 'options'
  }
}

module.exports = routes

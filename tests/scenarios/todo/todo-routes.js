'use strict'

let routes = {
  '/tasks': {
    get: 'query',
    post: 'save'
  },
  '/tasks/:id': {
    put: 'update',
    delete: 'remove',
    get: 'get',
    options: 'options'
  }
}

module.exports = routes

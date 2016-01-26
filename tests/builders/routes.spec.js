'use strict'
const expect = require('chai').expect

describe('Routes builder', function () {
  describe('api', function () {
    let routes = require('./../../src/builders/routes')

    it('should be defined', function (done) {
      expect(routes).not.to.be.undefined
      routes = routes()
      done()
    })
    it('should define a routes', function (done) {
      expect(routes.routes).not.to.be.undefined
      done()
    })
  })

  describe('construction', function () {
    let routesBuilder = require('./../../src/builders/routes'),
      myRoutes

    it('should build with success', function (done) {
      myRoutes = routesBuilder({
        routes: routes,
        dependencies: {
          dep: 'dep'
        }
      })

      function routes (request, response) {
        return 'routes'
      }
      done()
    })

    it('should define a routes', function (done) {
      expect(myRoutes.routes).not.to.be.undefined
      expect(myRoutes.routes().toString()).to.match(/routes/)
      done()
    })

  })
})

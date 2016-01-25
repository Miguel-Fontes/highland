'use strict'
const expect = require('chai').expect

describe('Module builder', function () {
  let module = require('./../../src/builders/module')

  describe('api', function () {
    it('should be defined', function (done) {
      expect(module).not.to.be.undefined
      done()
    })

    it('should return a value when called with no parameters', function (done) {
      expect(module()).not.to.be.undefined
      module = module()
      done()
    })

    it('should define a controllers api', function (done) {
      expect(module.controller).not.to.be.undefined
      done()
    })

    it('should define a router api', function (done) {
      expect(module.router).not.to.be.undefined
      done()
    })

  })
  describe('construction', function () {
    const module = require('./../../src/builders/module')
    const controller = require('./../mocks/controller.mock.js')
    const router = require('./../mocks/module-router.mock.js')

    it('should build a controller with no dependencies', function (done) {
      let ctrl = module({ controller: controller }).controller
      expect(ctrl.initialize).not.to.be.undefined
      expect(ctrl.save).not.to.be.undefined
      expect(ctrl.remove).not.to.be.undefined
      expect(ctrl.get).not.to.be.undefined
      expect(ctrl.query).not.to.be.undefined
      done()
    })

    it('should build a controller with dependencies', function (done) {
      let ctrl = module({ controller: controller, dependencies: { db: 'database' } }).controller
      expect(ctrl.initialize).not.to.be.undefined
      expect(ctrl.save).not.to.be.undefined
      expect(ctrl.remove).not.to.be.undefined
      expect(ctrl.get).not.to.be.undefined
      expect(ctrl.query).not.to.be.undefined
      expect(ctrl.spec).to.deep.equal({ db: 'database'})
      done()
    })

    it('should build a router with no dependencies', function (done) {
      let routes = module({ router: router }).router
      expect(routes).not.to.be.undefined
      done()
    })

    it('should build a router with dependencies', function (done) {
      let routes = module({ router: router, dependencies: { dependency: 'dependency' } }).router
      expect(routes).not.to.be.undefined
      expect(routes.spec).to.deep.equal({ dependency: 'dependency'})
      done()
    })

  })
  describe('definition', function () {
    const module = require('./../../src/builders/module')
    const controller = require('./../mocks/controller.mock.js')
    const router = require('./../mocks/module-router.mock.js')

    let myModule
    it('should build with sucess', function (done) {
      myModule = module({
        controller: controller,
        router: router,
        dependencies: {
          db: 'database',
          server: 'server'
        }
      })
      done()
    })

    it('should have constructed the router', function (done) {
      let routes = myModule.router
      expect(routes).not.to.be.undefined
      expect(routes.spec).to.deep.equal({ db: 'database', server: 'server'})
      done()
    })

    it('should have constructed the controller', function (done) {
      let ctrl = myModule.controller
      expect(ctrl.initialize).not.to.be.undefined
      expect(ctrl.save).not.to.be.undefined
      expect(ctrl.remove).not.to.be.undefined
      expect(ctrl.get).not.to.be.undefined
      expect(ctrl.query).not.to.be.undefined
      expect(ctrl.spec).to.deep.equal({ db: 'database', server: 'server'})
      done()
    })
  })
})

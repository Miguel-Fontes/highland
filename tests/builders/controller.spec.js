'use strict'
const expect = require('chai').expect
const request = require('./../mocks/request.mock')
const response = require('./../mocks/response.mock')(function () {return 'ok'})

describe('Controller', function () {
  let controller = require('./../../src/builders/controller')
  it('should be defined', function (done) {
    expect(controller).not.to.be.undefined
    done()
  })

  it('should build successfully', function (done) {
    expect(controller()).not.to.be.undefined
    controller = controller()
    done()
  })
  it('should define a initialize API', function (done) {
    expect(controller.initialize).not.to.be.undefined
    done()
  })
  it('should define a remove API', function (done) {
    expect(controller.remove).not.to.be.undefined
    done()
  })
  it('should define a query API', function (done) {
    expect(controller.query).not.to.be.undefined
    done()
  })
  it('should define a update API', function (done) {
    expect(controller.update).not.to.be.undefined
    done()
  })
  it('should define a get API', function (done) {
    expect(controller.get).not.to.be.undefined
    done()
  })
  it('should define a options API', function (done) {
    expect(controller.options).not.to.be.undefined
    done()
  })
  it('should define a save API', function (done) {
    expect(controller.save).not.to.be.undefined
    done()
  })
  it('should define a forbidden API', function (done) {
    expect(controller.forbidden).not.to.be.undefined
    done()
  })

  describe('functions', function () {
    let controller = require('./../../src/builders/controller')
    let mockController

    before(() => {
      mockController = controller({
        initialize: function (params, request, response) {
          return 'initialize'
        },
        remove: function (params, request, response) {
          return 'remove'
        },
        query: function (params, request, response) {
          return 'query'
        },
        update: function (params, request, response) {
          return 'update'
        },
        get: function (params, request, response) {
          return 'get'
        },
        options: function (params, request, response) {
          return 'options'
        },
        save: function (params, request, response) {
          return 'save'
        },
        forbidden: function (params, request, response) {
          return 'forbidden'
        }
      })
    })

    it('should return "initialize" from initialize api', function (done) {
      expect(mockController.initialize({}, request, response)).to.be.equal('initialize')
      mockController.initialize({}, request, response)
      done()
    })
    it('should return "remove" from remove api', function (done) {
      expect(mockController.remove({}, request, response)).to.be.equal('remove')
      mockController.remove({}, request, response)
      done()
    })

    it('should return "query" from query api', function (done) {
      expect(mockController.query({}, request, response)).to.be.equal('query')
      mockController.query({}, request, response)
      done()
    })

    it('should return "update" from update api', function (done) {
      expect(mockController.update({}, request, response)).to.be.equal('update')
      mockController.update({}, request, response)
      done()
    })

    it('should return "get" from get api', function (done) {
      expect(mockController.get({}, request, response)).to.be.equal('get')
      mockController.get({}, request, response)
      done()
    })

    it('should return "options" from options api', function (done) {
      expect(mockController.options({}, request, response)).to.be.equal('options')
      mockController.options({}, request, response)
      done()
    })

    it('should return "save" from save api', function (done) {
      expect(mockController.save({}, request, response)).to.be.equal('save')
      mockController.save({}, request, response)
      done()
    })

    it('should return "forbidden" from forbidden api', function (done) {
      expect(mockController.forbidden({}, request, response)).to.be.equal('forbidden')
      mockController.forbidden({}, request, response)
      done()
    })

  })

})

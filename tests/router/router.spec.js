'use strict'
describe('Router suite', function () {
  var router = require('./../../src/router/router')
  var expect = require('chai').expect

  var request = require('./../mocks/request.mock')
  var response = require('./../mocks/response.mock')

  var router
  describe('object', function () {
    it('should be defined', function (done) {
      expect(router).not.to.be.undefined
      done()
    })
    
    it('should define a when api', function (done) {
      expect(router.when).not.to.be.undefined
      done()
    })
    it('should define a end api', function (done) {
      expect(router.end).not.to.be.undefined
      done()
    })
    it('should define a all api', function (done) {
      expect(router.all).not.to.be.undefined
      done()
    })
  })

  describe('all api', function () {
    it('should match GET request to /tasks', function (done) {
      var rq = request('GET', '/tasks')
      var rs = response(null)

      router.all('/tasks', rq, rs, function () {
        done()
      }).end()
    })

    it('should match GET request to /tasks/999', function (done) {
      var rq = request('GET', '/tasks/999')
      var rs = response(null)

      router.all('/tasks/:id', rq, rs, function () {
        done()
      }).end()
    })

    it('should match POST request to /tasks', function (done) {
      var rq = request('POST', '/tasks')
      var rs = response(null)

      router.all('/tasks', rq, rs, function () {
        done()
      }).end()
    })

    it('should match PUT request to /tasks/123', function (done) {
      var rq = request('PUT', '/tasks/123')
      var rs = response(null)

      router.all('/tasks/:id', rq, rs, function () {
        done()
      }).end()
    })

    it('should match DELETE request to /tasks/123', function (done) {
      var rq = request('DELETE', '/tasks/123')
      var rs = response(null)

      router.all('/tasks/:id', rq, rs, function () {
        done()
      }).end()
    })
  })

  describe('when api', function () {
    it('should match a GET request to /tasks', function (done) {
      var rq = request('GET', '/tasks')
      router.when('GET', '/tasks', rq, function () {
        done()
      }).end()
    })

    it('should match a GET request to /tasks/123', function (done) {
      var rq = request('GET', '/tasks/123')
      router.when('GET', '/tasks/:id', rq, function () {
        done()
      }).end()
    })

    it('should match a POST request to /tasks', function (done) {
      var rq = request('POST', '/tasks')
      router.when('POST', '/tasks', rq, function () {
        done()
      }).end()
    })

    it('should match a PUT request to /tasks/123', function (done) {
      var rq = request('PUT', '/tasks/123')
      router.when('PUT', '/tasks/:id', rq, function () {
        done()
      }).end()
    })

    it('should match a DELETE request to /tasks/123', function (done) {
      var rq = request('DELETE', '/tasks/123')
      router.when('DELETE', '/tasks/:id', rq, function () {
        done()
      }).end()
    })

  })
})

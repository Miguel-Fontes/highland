'use strict'
let expect = require('chai').expect

describe('Server', function () {
  describe('API', function () {
    let server = require('./../src/server.js')()

    it('should be defined.', function (done) {
      expect(server).not.to.be.undefined
      done()
    })

    it('should be a object', function (done) {
      expect(typeof server).to.be.equals('object')
      done()
    })

    it('should define "getServer"', function (done) {
      expect(server.getServer).not.to.be.undefined
      done()
    })

    it('should define "stop"', function (done) {
      expect(server.stop).not.to.be.undefined
      done()
    })
    it('should define "initialize"', function (done) {
      expect(server.initialize).not.to.be.undefined
      done()
    })
  })
  describe('initialization', function () {
    it('should initialize with no parameters', function (done) {
      let server = require('./../src/server.js')()
      expect(server.getServer()).not.to.be.undefined
      expect(server.getServer().constructor).to.match(/Server/)
      done()
    })

    it('should initialize with parameters', function (done) {
      let server = require('./../src/server.js')({hostname: 'localhost', port: '8080'})
      expect(server.getServer()).not.to.be.undefined
      expect(server.getServer().constructor).to.match(/Server/)
      done()
    })
  })
})

'use strict'
let expect = require('chai').expect
let app = require('./../src/highland.js')()
let request = require('supertest')
let mod = require('./mocks/module.mock.js')

describe('highland', function () {
  after(done => {
    app.stop()
    done()
  })

  it('should be defined.', function (done) {
    expect(app).not.to.be.undefined
    done()
  })

  it('should be a object', function (done) {
    expect(typeof app).to.be.equals('object')
    done()
  })

  it('should define "use"', function (done) {
    expect(app.use).not.to.be.undefined
    done()
  })

  it('should define "listen"', function (done) {
    expect(app.listen).not.to.be.undefined
    done()
  })

  it('should accept a call to "use"', function (done) {
    let module = {entry: mod, route: '/mod'}
    expect(app.use(module)).to.be.equals(app)
    done()
  })

  it('should accept a call to "listen" with no parameters', function (done) {
    expect(app.listen()).to.be.equals(app)
    done()
  })

  it('shoud be listening at 8080 and respond with "test done"', function (done) {
    let http = request(app.http().getServer())

    http
      .get('/mod')
      .expect(200)
      .expect('query')
      .end(done)
  })

  describe('several modules', function () {
    after(done => {
      app.stop()
      done()
    })

    it('should register 2 modules', function (done) {
      let mod1 = require('./mocks/modules/module1.mock.js')
      let mod2 = require('./mocks/modules/module2.mock.js')

      expect(app.use({entry: mod1, route: '/module'})).to.be.equals(app)
      expect(app.use({entry: mod2, route: '/mod2'})).to.be.equals(app)

      done()
    })

    it('should accept a call to "listen" with no parameters', function (done) {
      expect(app.listen()).to.be.equals(app)
      done()
    })

    it('shoud return "test done" for a request to the route /mod', function (done) {
      let http = request(app.http().getServer())

      http
        .get('/mod')
        .expect(200)
        .expect('query')
        .end(done)
    })

    it('shoud return "test done" for a request to the new route /module', function (done) {
      let http = request(app.http().getServer())

      http
        .get('/module')
        .expect(200)
        .expect('query')
        .end(done)
    })

    it('shoud return "test done" for a request to the new route /mod2', function (done) {
      let http = request(app.http().getServer())

      http
        .get('/mod2')
        .expect(200)
        .expect('query')
        .end(done)
    })

  })

})

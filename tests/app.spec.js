'use strict'
const expect = require('chai').expect
let request = require('supertest')
const highland = require('./../src/highland')

const mod = require('./mocks/module.mock')()
const ctrl = require('./mocks/controller.mock')

describe('App suite', function (done) {
  const app = highland()

  it('should start our application', function (done) {
    app.use({
      entry: mod,
      route: '/mod'
    })

    app.listen()

    done()
  })

  it('should response a request to /mod with "query"', function (done) {
    let http = request(app.http().getServer())
    http
      .get('/mod')
      .expect(200)
      .expect('query')
      .end(function (err, res) {
        if (err) throw err
        done()
      })
  })
})

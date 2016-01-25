'use strict'
let expect = require('chai').expect
let app = require('./../src/highland.js')()
let request = require('supertest')

describe('highland', function () {
  it('should be defined.', function (done) {
    expect(app).not.to.be.undefined
    done()
  })
  
  after(done => {
      app.stop()
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
    var fake = function mod (rq, rs) {
      rs.writeHead(200)
      rs.write('test done')
      rs.end()
    }
    let module = {module: fake, routes: fake, route: 'mod'}
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
      .expect(rs => {
          if (rs.text !== 'test done') {
              return rs
          }
      })
      .end(done)
  })
  
  

})

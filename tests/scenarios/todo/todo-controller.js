'use strict'

let controller = {
  remove: remove,
  query: query,
  update: update,
  get: get,
  options: options,
  save: save,
  forbidden: forbidden
}

const responseHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'application/json'
}

// Helper function para escrever os responses
function buildResponse (response, status, headers, value) {
  response.writeHead(status, headers)

  if (value) {
    value = JSON.stringify(value)
    response.write(value)
  }
  return response
}

function readRequest (rq, rs, dataAction) {
  let chunks = []
  let body
  rq.on('data', function (chunk) {
    chunks.push(chunk)
  }).on('end', function () {
    body = Buffer.concat(chunks).toString()
    dataAction(body)
  })
}

// Handlers de actions para Routers
function save (rq, rs, my) {
  readRequest(rq, rs, saveCallback)

  // Callback a ser chamado no fim da leitura dos dados do request
  function saveCallback (value) {
    my.db('tasks').save(JSON.parse(value), function (savedValue) {
      buildResponse(rs, 201, responseHeaders, savedValue)
        .end()
    })
  }
}

function update (rq, rs, my) {
  readRequest(rq, rs, updateCallback)

  // Callback a ser chamado no fim da leitura dos dados do request
  function updateCallback (rq, rs, value) {
    my.db('tasks').update(JSON.parse(value), function (updatedValue) {
      buildResponse(rs, 200, responseHeaders, updatedValue)
        .end()
    })
  }
}

function remove (rq, rs, my) {
  my.db('tasks').remove(rq.params.id, function (value) {
    buildResponse(rs, 200, responseHeaders, value)
      .end()
  })

}

function get (rq, rs, my) {
  my.db('tasks').get(rq.params.id, function (value) {
    // Se encontrei a tarefa, retorno para o cliente
    // Caso contrário, envio um status 404
    if (value != '') {
      buildResponse(rs, 200, responseHeaders, value)
        .end()
    } else {
      buildResponse(rs, 404, responseHeaders)
        .end()
    }
  })
}

function query (rq, rs, my) {
  my.db('tasks').query(function (data) {
    buildResponse(rs, 200, responseHeaders, data)
      .end()
  })
}

function forbidden (rq, rs, my) {
  buildResponse(rs, 400, responseHeaders, 'BAD REQUEST')
    .end()
}

function options (rq, rs, my) {
  buildResponse(rs, 200, responseHeaders)
    .end()
}

module.exports = controller

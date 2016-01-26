'use strict'
function Produto (nome, descricao, preco, categoria, estado, quantidade) {
  var md = this

  // Atributos
  md.nome = nome
  md.descricao = descricao
  md.preco = preco
  md.categoria = categoria || 'Sem categoria'
  md.estado = estado || 0
  md.quantidade = quantidade || 0

  // API
  md.toString = toString

  // Funções
  function toString () {
    return md.nome + ':  ' + md.descricao + ' - R$' + md.preco
  }

}

module.exports = Produto

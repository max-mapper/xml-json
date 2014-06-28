var parse = require('xml2js').parseString
var concat = require('concat-stream')

module.exports = function(cb) {
  return concat(function(data) {
    parse(data, cb)
  })
}

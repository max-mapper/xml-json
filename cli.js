#!/usr/bin/env node

var convert = require('./')
var fs = require('fs')

run()

function run() {
  if (process.argv[2] === 'help')
    return console.error('Usage: xml-to-json <source>')
  var input = getStream(process.argv[2])

  var converter = convert(function(err, json) {
    if (err) return console.error(err)
    console.log(JSON.stringify(json, null, '  '))
  })

  input.pipe(converter)
}

function getStream(uri) {
  if (fs.existsSync(uri)) {
    return fs.createReadStream(uri)
  } else {
    return process.stdin
  }
}

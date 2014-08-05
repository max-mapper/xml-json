#!/usr/bin/env node

var convert = require('./')
var fs = require('fs')
var ldj = require('ldjson-stream')
var args = require('minimist')(process.argv.slice(2))

var first = args._[0]
var second = args._[1]

run()

function run() {
  if (first === 'help')
    return console.error('Usage: xml-json <file> <filter>, or cat file.xml | xml-json <filter>')
  
  var input = getStream(first)
  var converter = convert(second, args)
  input.pipe(converter).pipe(ldj.serialize()).pipe(process.stdout)
}

function getStream(uri) {
  if (fs.existsSync(uri)) {
    return fs.createReadStream(uri)
  } else {
    // shift args
    second = first
    return process.stdin
  }
}

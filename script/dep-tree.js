#!/usr/bin/env node

var through = require('through2');

function deptree() {
  var keyProp = 'key';
  var buffer = {};
  var addPackage = function(key) {
    return (buffer[key] = buffer[key] || { key: key, dependents: [], devDependents: [] });
  }
  
  var thr = through.obj(function write(obj,enc,next) {
    var key = obj[keyProp];
    var reverse = addPackage(key);
    obj.dependencies.forEach(function(dep) {
      addPackage(dep).dependents.push(reverse.key)
    })
    obj.devDependencies.forEach(function(dep) {
      addPackage(dep).devDependents.push(reverse.key);
    })
    
    next();
  }, function end(cb) {
    for(key in buffer) {
      this.push(buffer[key]);
    }
    this.push(null);
    if(cb) cb();
  });
  
  return thr;
}

module.exports = deptree;

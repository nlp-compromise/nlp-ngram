(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nlpNgram = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _ngram = require('./ngram');

var nlpNgram = {
  Text: {
    //Text methods

    ngram: function ngram(options) {
      var terms = this.terms();
      terms = terms.map(function (t) {
        var str = t.normal.replace(/'s$/, '');
        return str;
      });
      return _ngram(terms, options);
    }
  }
};

module.exports = nlpNgram;

// const nlp = require('nlp_compromise');
// nlp.plugin(nlpNgram);
// let w = nlp.text('she said she swims');
// console.log(w.ngram());

},{"./ngram":2}],2:[function(require,module,exports){
'use strict';
//split a string into all possible parts

//remove nulls from an array

var compact = function compact(arr) {
  return arr.filter(function (a) {
    if (a === undefined || a === null) {
      return false;
    }
    return true;
  });
};

//n-gram takes a list of pre-cleaned terms, and makes no assumptions
var ngram = function ngram(terms, options) {
  options = options || {};
  var min_count = options.min_count || 1; // minimum hit-count
  var max_size = options.max_size || 5; // maximum gram count
  var keys = [null];
  var results = [];
  //prepare the keys object
  for (var i = 1; i <= max_size; i++) {
    keys.push({});
  }
  // Create a hash for counting..
  var textlen = terms.length;
  for (var i = 0; i < textlen; i++) {
    var s = terms[i];
    keys[1][s] = (keys[1][s] || 0) + 1;
    for (var j = 2; j <= max_size; j++) {
      if (i + j <= textlen) {
        s += ' ' + terms[i + j - 1];
        keys[j][s] = (keys[j][s] || 0) + 1;
      } else {
        break;
      }
    }
  }
  // map the hash to an array for sorting
  for (var k = 1; k < max_size; k++) {
    results[k] = [];
    var key = keys[k];
    var words = Object.keys(keys[k]);
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (key[word] >= min_count) {
        results[k].push({
          'word': word,
          'count': key[word],
          'size': k
        });
      }
    }
  }
  //post-process + sort
  results = compact(results);
  results = results.map(function (r) {
    r = r.sort(function (a, b) {
      return b.count - a.count;
    });
    return r;
  });
  return results;
};

// console.log(ngram("hi dr nick! dr nick!".split(" ")))

module.exports = ngram;

},{}]},{},[1])(1)
});
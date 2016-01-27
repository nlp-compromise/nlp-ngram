'use strict';
const nlp = require('../../nlp-core');
const ngram = require('./ngram');

let plugin = {
  Text: {
    //Text methods
    ngram(options) {
      let terms = this.terms();
      terms = terms.map(function(t) {
        return t.normal;
      });
      return ngram(terms, options);
    }
  }
};
nlp.plugin(plugin);

module.exports = plugin;

// let w = nlp.text('she said she swims');
// console.log(w.ngram());




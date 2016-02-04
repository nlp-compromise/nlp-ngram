'use strict';
const ngram = require('./ngram');

let nlpNgram = {
  Text: {
    //Text methods
    ngram(options) {
      let terms = this.terms();
      terms = terms.map(function(t) {
        var str = t.normal.replace(/'s$/, '');
        return str;
      });
      return ngram(terms, options);
    }
  }
};

module.exports = nlpNgram;

// const nlp = require('nlp_compromise');
// nlp.plugin(nlpNgram);
// let w = nlp.text('she said she swims');
// console.log(w.ngram());

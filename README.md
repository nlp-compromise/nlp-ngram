a frequency analysis of the terms in a text

it uses nlp-compromise for proper tokenization & normalization

*t.ngram({min_count:1, max_size:5})*
```javascript
options.min_count = 1 // throws away seldom-repeated grams
options.max_size = 5 // maximum gram count. prevents the result from becoming gigantic
```

```javascript
var nlp = require('nlp_compromise');
var nlpNgram = require('nlp-ngram');
nlp.plugin(nlpNgram);

var t = nlp.text('she said she swims');
t.ngram()
/*
[ [ { word: 'she', count: 2, size: 1 },
    { word: 'said', count: 1, size: 1 },
    { word: 'swims', count: 1, size: 1 } ],
  [ { word: 'she said', count: 1, size: 2 },
    { word: 'said she', count: 1, size: 2 },
    { word: 'she swims', count: 1, size: 2 } ],
  [ { word: 'she said she', count: 1, size: 3 },
    { word: 'said she swims', count: 1, size: 3 } ],
  [ { word: 'she said she swims', count: 1, size: 4 } ] ]
*/
```

it also takes advantage of the proper tokenization & cleverness of nlp_compromise, ie "Tony Hawk" is one token, not two:
```javascript
var t = nlp.text(`Tony Hawk played Tony Hawk's pro skater`);
t.ngram()
/*
[ [ { word: 'tony hawk', count: 2, size: 1 },
    { word: 'played', count: 1, size: 1 },
    { word: 'pro', count: 1, size: 1 },
    { word: 'skater', count: 1, size: 1 } ],
  [ { word: 'tony hawk played', count: 1, size: 2 },
    { word: 'played tony hawk', count: 1, size: 2 },
    { word: 'tony hawk pro', count: 1, size: 2 },
    { word: 'pro skater', count: 1, size: 2 } ],
  [ { word: 'tony hawk played tony hawk', count: 1, size: 3 },
    { word: 'played tony hawk pro', count: 1, size: 3 },
    { word: 'tony hawk pro skater', count: 1, size: 3 } ],
  [ { word: 'tony hawk played tony hawk pro', count: 1, size: 4 },
    { word: 'played tony hawk pro skater', count: 1, size: 4 } ] ]
*/
```
```javascript
var t = nlp.text(`Tony Hawk played Tony Hawk's pro skater`);
t.ngram({min_count:2})
// [ [ { word: 'tony hawk', count: 2, size: 1 } ], [], [], [] ]
```
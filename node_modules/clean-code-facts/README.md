# clean-code-facts
Interesting clean code quotes to inspire developers.

Quotes from Robert C. Martin (The great uncle bob), Clean Code: A Handbook of Agile Software Craftsmanship

Seriously if you have not read this book, you really should, it's worth every penny.

Amazon: https://www.amazon.co.uk/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/

Also check out the videos, they are both entertaining and educational. They should be required learning for all developers.

https://cleancoders.com/videos

## Installation

```
$ npm install clean-code-facts --save
```


## Usage

```js
const cleanCodeFacts = require('clean-code-facts');

let randomFact = cleanCodeFacts.random();
// 'Of course bad code can be cleaned up. But it’s very expensive.'

let allFacts = cleanCodeFacts.all;
// [
//   'Truth can only be found in one place: the code.',
//   'It is not enough for code to work.',
//   ...
// ]
```


# Pairs based structures library
Functional library for manipulation of pairs-based data structures with [Sass](https://sass-lang.com/)-like API. Original ideas from [SICP](https://mitpress.mit.edu/sites/default/files/sicp/index.html).

Library for study. **Not** for production projects.

## About
The library contains 3 data structures and functions for working with them. Key features:
- creation and manipulation occur using **functions**
- objects are not used
- structures are **immutable**

Functions for creating are called *constructors*. Functions for getting data are called *selectors*.

The library consists of the following structures:
- pair
- list
- map

All structures based on **pairs**.

### Pair
Pair is simple structure that consist of 2 any type elements. Pair may contain other pairs.
```ts
import { pair, fir, sec, toString } from 'pbsl/pair';

const myPair = pair(1, 2);
const nestedPair = pair('testou', myPair);

fir(myPair) // 1
sec(myPair) // 2

toString(myPair) // (1, 2)
toString(nestedPair) // (testou, (1, 2))
```

### List
The list is an orderly sequence of any elements. By default, the list are typed by first item. Also you can specify the type manually.
```ts
import { pair } from 'pbsl/pair';
import { l, top, tail, toString, prepand } from 'pbsl/list';

const myList = l(2, 5, 6);
const pairInList = l<unknown>(pair(1, 0), 'item', 'end');

top(myList) // 2
tail(myList) // l(5, 6)
prepand(myList, 0) // (0, 2, 5, 6)
toString(myList) // (2, 5, 6)
toString(pairInList) // ((1, 0), item, end)
```

**Under the hood**, list is a nested pairs where second element of last pair is a `null`. Empty list also is `null`.
```ts
l(2, 5, 6) // pair(2, pair(5, pair(6, null)))
```

#### Manipulation
For working with the lists are available some functions with [Sass-like API](https://sass-lang.com/documentation/modules/list):
- `append`
- `index`
- `join`
- `length`
- `nth`
- `setNth`

And main functions for working with sequences with js [Array-like API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array):
- `map`
- `filter`
- `reduce`
- `find`
- `findIndex`

### Map
Map is a `list` of `pairs` in the 'key-value' format. The map is created based on array with a tuples with 2 elements: key and value. Typed like a list with ability to specify a types.
```ts
import { mkMap, get, set } from 'pbsl/map';
import { toString } from 'pbsl/list';

const myMap = mkMap([['name', 'mister'], ['age', '54']]);
const codes = mkMap([[200, 'ok'], [403, 'forbidden'], [404, 'not found']]);

toString(myMap) // ((name, mister), (age, 54))
get(myMap, 'name') // 'mister'
toString(set(myMap, 'race', 'human')) // ((race, human), (name, mister), (age, 54))
```

For working with maps also used [Sass-like API](https://sass-lang.com/documentation/modules/map). The following functions are available:
- `get`
- `set`
- `has`
- `remove`
- `merge`
- `keys`
- `values`

## Installation
```bash
npm i -D pbsl
```

## License
MIT

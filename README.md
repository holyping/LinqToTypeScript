# Linq To TypeScript
Linq to TypeScript

- Implementation of LINQ for TypeScript
- Targets TypeScript 2.8 and ES 2016

### Getting Started

```sh
npm i linq-to-typescript
```

#### tsconfig.json
```JSON
"compilerOptions": {
    "target": "es2016",
    "lib": [
      "dom",
      "es2016",
      "esnext.asynciterable"      
    ],
}
```

#### TypeScript
```TypeScript
// 0. Import Module
import { ArrayEnumerable, Enumerable, AsyncEnumerable, initializeLinq } from "linq-to-typescript"

// To Use With Wrappers
const evenNumbers = Enumerable.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).where((x) => x % 2 === 0).toArray()

// To Use Without Wrappers
// 1. Declare that the JS types implement the IEnumerable interface
declare global {
    interface Array<T> extends IEnumerable<T> {
        concat(items: IEnumerable<T>): IEnumerable<T>;
        concat(...items: Array<ReadonlyArray<T>>): ArrayEnumerable<T>;
        concat(...items: Array<T | ReadonlyArray<T>>): ArrayEnumerable<T>;    
    }
    interface Uint8Array extends IEnumerable<number> { }
    interface Uint8ClampedArray extends IEnumerable<number> { }
    interface Uint16Array extends IEnumerable<number> { }
    interface Uint32Array extends IEnumerable<number> { }
    interface Int8Array extends IEnumerable<number> { }
    interface Int16Array extends IEnumerable<number> { }
    interface Int32Array extends IEnumerable<number> { }
    interface Float32Array extends IEnumerable<number> { }
    interface Float64Array extends IEnumerable<number> { }
    interface Map<K, V> extends IEnumerable<[K, V]> { }
    interface Set<T> extends IEnumerable<T> { }
}
// 2. Bind Linq Functions to Array and Map
initializeLinq()
// 3. Use without a wrapper type
const evenNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].where((x) => x % 2 === 0).toArray()
```

### API

**LinqToTypeScript implements the functionality of the IEnumerable interface**

- IEnumerable, IAsyncEnumerable, and IParallelEnumerable interfaces based on,
- [IEnumerable&lt;T&gt; Interface](https://msdn.microsoft.com/en-us/library/9eekhta0(v=vs.110).aspx)
- Some changes made due to conflics with existing method names
- Some changes made due to limitations of JavaScript

#### IEnumerable
- Inspired by LINQ API Surface
- Has Async methods that return `Promise` or `IAsyncEnumerable`
- Implements `Iterable<T>` interface.

#### IAsyncEnumerable
- Inspired by LINQ API Surface
- Has Async methods that return `Promise` or `IAsyncEnumerable`
- For asynchornous iteration.
- Implements `AsyncIterable<T>` interface.

#### IParallelEnumerable
- Inspired by LINQ API Surface
- Has Async methods that return `Promise` or `IParallelEnumerable`
- Implements `AsyncIterable<T>` interface.

#### Shared Api Methods

- aggregate
- all
- allAsync
- any
- anyAsync
- average
- averageAsync
- concat
- contains
- count
- countAsync
- distinct
- elementAt
- elementAtOrDefault
- except
- first
- firstAsync
- firstOrDefault
- firstOrDefaultAsync
- each
- eachAsync
- groupBy
- groupByWithSel
- intersect
- joinByKey
- last
- lastAsync
- lastOrDefault
- lastOrDefaultAsync
- max
- maxAsync
- min
- minAsync
- ofType
- orderBy
- orderByDescending
- reverse
- select
- selectAsync
- selectMany
- selectManyAsync
- sequenceEquals
- sequenceEqualsAsync
- single
- singleAsync
- singleOrDefault
- singleOrDefaultAsync
- skip
- skipWhile
- skipWhileAsync
- sum
- sumAsync
- take
- takeWhile
- takeWhileAsync
- toArray
- toMap
- toMapAsync
- toSet
- union
- unionAsync
- where
- whereAsync
- zip
- zipAsync

### Examples

```TypeScript
// AGGREGATE
[1, 2].aggregate((x, y) => x + y) // 3
["f", "o", "o"].aggregate((x, y) => x + y) // "foo"
[1, 2, 3].aggregate(4, (acc, x) => acc + x) // 10
[1, 2, 3].aggregate("seed", (acc, y) => acc + y, acc => acc + "result") // "seed123result"

// ALL
[1, 2].all(x => x < 3) // true
[1, 2].all(x => x < 2) // false

// ANY
[0].any() // true
[true].any(x => !x) // false

// CONCAT
[1, 2].concat([2, 3]) // [1, 2, 2, 3]

// CONTAINS
[1, 2, 3].contains(1) // true
[1, "2", "3"].contains(2, EqualityComparer) // true

// COUNT
[1, 2, 3].count() // 3
[true, true, false].count(x => x) // false

// DISTINCT
["f", "o", "o"].distinct() // "foo"
["1", 1, 2, 2, 3, "3"].distinct(EqualityComparer) // ["1", 2, 3]

// ENUMERATEOBJECT
for (let item of Enumerable.enumerateObject(object)) {
  // ...
}

// EACH
let y = 0;
[1, 2].each(x => y += x)

// ELEMENTAT
[1, 2].elementAt(1) // 2

// ELEMENTATORDEFAULT
[1, 2].elementAtOrDefault(3) // null

// EXCEPT
[1, 2].except([1]) // [2]
([1, 2] as Linq.IEnumerable<string | number>).except(["1"], EqualityComparer) // [2]

// FIRST
[1, 2].first() // 1
[1, 2].first(x => x === 2) // 2

// FIRSTORDEFAULT
[].firstOrDefault() // null

// FLATTEN
Linq.Enumerable.flatten([1, [2, 3]]) // [1, 2, 3]

// GROUPBY
const groupByBreed = cats.groupBy(cat => cat.breed)
const groupByBreedThenAge = groupByBreed.thenBy(cat => cat.age)

// INTERSECT
[1, 2, 3].intersect([1, 2]) // [1, 2]
[1, 2, "3"].intersect(["1", "2"], EqualityComparer) // [1, 2]

// TAKE
[1, 2, 3, 4, 5].take(2) // [1, 2]

// LAST
[1, 2].last() // 2
[1, 2].last(x => x === 1) // 1

// LASTORDEFAULT
[].lastOrDefault() // null
[1, 2, 3].lastOrDefault(x => x === 4) // null

// MAX
[1, 2, 3].max() // 3
[1, 2, 3].max(x => x * x) // 9

// MIN
[1, 2, 3, -7].min() // -7
[1, 2, 3, -7].min(Math.abs) // 1

// OFTYPE
["str", "str2", 1, 2, 3, {}].ofType("string") // ["str", "str2"]
[1, 2, "4", false, true].ofType("boolean") // [false, true]

// ORDERBY
[3, 4, 7, 0, 1].orderBy(x => x) // [0, 1, 3, 4, 7]

// REVERSE
[1, 2, 3].reverse() // [3, 2, 1]

// SELECT
[1, 2, 3].select(x => x * 10) // [10, 20, 30]

// SELECTMANY
[1, 2, 3].selectMany((x) => [x, x * x]) // [1, 1, 2, 4, 3, 9]

[1, 2, 3].skip(2) // [3]

// UNION
[1, 2, 3].union([4, 5, 6]) // [1, 2, 3, 4, 5, 6]
```

### Design

#### Binding new APIs to Array Types
JavaScript doesn't have extension methods like in C#, therefore we extend the class itself with new methods.
Call ```initializeLinq``` to bind library functions to default Array methods, 

The following collections support ```IEnumerable```,
* Array
* Map
* Set
* String
* Int8Array
* Int16Array
* Int32Array
* Uint8Array
* Uint8ClampedArray
* Uint16Array
* Uint32Array
* Float32Array
* Float64Array

#### Using Wrappers
Wrappers are safer as they won't interfere with other libraries.

```TypeScript
// To Create an IEnumerable<T>
Enumerable.from(iterableIteratorOrArray)
// To Create an IAsyncEnumerable<T>
AsyncEnumerable.from(asyncIterableIteratorOrPromiseArray)
// To Create an IParallelEnumerable<T>
ParallelEnumerable.from(arrayOfPromises)
```

The root classes are 
- ```Enumerable```
- ```AsyncEnumerable```
- ```ParallelEnumerable```
Collections simple call the static methods.

### F.A.Q.

**Q**
I am getting a `Cannot find module 'core-js/modules/es7.symbol.async-iterator'`

**A**
Ensure you have `core-js` NPM package installed.

**Q**
Why did you create this?

**A**
For fun and to gain understanding of TypeScript and Node Package Manager.

**Q**
Why not target ES5?

**A**
Backward compatibility is not a concern. You are free to target ES5 instead.

**Q**
How does this compare to other LINQ libraries?

**A**
They are more mature, but not made targeting latest ECMAScript features.

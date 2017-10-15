# Araneo

[![NPM](https://nodei.co/npm/araneo.png)](https://nodei.co/npm/araneo/)

Helper for validation and getting value by path

## How to use

### CommonJs

```js
import araneo from 'araneo';

const obj = araneo({foo: 'bar'});
obj.node().value;
```

### RequireJs

```js
const araneo = require('araneo');

const obj = araneo({foo: 'bar'});
obj.node().value;
```

## API reference

### `node(path)`

* `path`: path string (for example 'toc.chapter')

Return araneo Node object.

## Node reference

| Pipe method | Arguments | Description                    |
|-------------|-----------|--------------------------------|
| isString    |none       | check is node object is string |
| isExist     |none       | check is node object is exist  |
| isNumber    |none       | check is node object is number |

© Alexander Pokhodyun (Karbunkul) 2017

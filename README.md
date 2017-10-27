[![Build Status](https://travis-ci.org/karbunkul/araneo.svg?branch=master)](https://travis-ci.org/karbunkul/araneo)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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

| Pipe method | Arguments                  | Description                                 |
|-------------|----------------------------|---------------------------------------------|
| isString    |none                        | check is node object is string              |
| trim        |none                        | trim spaces                                 |
| isExist     |none                        | check is node object is exist               |
| isNumber    |none                        | check is node object is number              |
| required    |fields - required props     | check if all required props exist in object |

© Alexander Pokhodyun (Karbunkul) 2017

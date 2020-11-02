# firetree 🔥🌲
AST parser and generator for Firebase Firestore and Storage security rules

## Project Status

[![license](https://img.shields.io/npm/l/moltres.svg)](https://github.com/brianneisler/moltres/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/firetree.svg)](https://badge.fury.io/js/firetree)<br />
[![Build Status](https://travis-ci.com/brianneisler/firetree.svg)](https://travis-ci.com/brianneisler/firetree)<br />
[![Code coverage](https://codecov.io/gh/brianneisler/firetree/branch/master/graph/badge.svg)](https://codecov.io/gh/brianneisler/firetree/branch/master/)<br />
[![NPM](https://nodei.co/npm/firetree.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/firetree/)

## Documentation

[Full API documentation](docs/API.md) - Learn about each method


## Why?

Firestore security rules lacks an available AST parser.... so I made one. 

This can come in handy for making additional tools, like IDE plugins, security
rules analyzers or even a [minifier](https://github.com/brianneisler/firemin)

## Features
- [x] Parses firestore rules into an AST
- [x] Generates rules from an AST

## TODO
- [ ] Support stdin and stdout for the binary commands

## Install

```sh
npm install --save-dev firetree
```

## Usage

The firetree parser can be used as an imported library or as a binary.

## Using Programmatically

To do so, simply
install `firetree` as a project dependency and then
import the necessary methods from the `firetree` package

```sh
npm install --save firetree
```

```js
import { generate, parse, setupContext } from 'firetree'

const context = setupContext()

const ast = await parse(context, {
  filePath: './path/to/firestore.rules')
})
const rulesString = await generate(context, { ast })
```


## Using the Binary

You can using the binary directly by installing globally

```sh
npm install -g firemin
```

To parse a rules file, use the `parse` command

```sh
firetree parse -f ./path/to/my-firestore.rules
```

By default the output file is `./firestore.ast.rules.json`. To specify a different
path you can use the `-o` option.

```sh
firetree parse -f ./path/to/my-firestore.rules -o ./output/file/my-firestore.ast.rules.json
```


To generate a rules file from an AST, use the `generate` command

```sh
firetree generate -f ./path/to/my-firestore.ast.rules.json
```

By default the output file is `./firestore.rules`. To specify a different
path you can use the `-o` option.

```sh
firetree generate -f ./path/to/my-firestore.ast.rules.json -o ./output/file/my-firestore.rules
```

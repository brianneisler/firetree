# API

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->

- [ast](#ast)
  - [function assocNodeChild()](#function-assocnodechild)
- [context](#context)
  - [function setupContext()](#function-setupcontext)
- [generator](#generator)
  - [function generate()](#function-generate)
- [parser](#parser)
  - [function parse()](#function-parse)
- [lang.util](#langutil)
  - [**private** function cacheChain()](#private-function-cachechain)
  - [**private** function functionDefineLength()](#private-function-functiondefinelength)
  <!-- AUTO-GENERATED-CONTENT:END -->

<!-- AUTO-GENERATED-CONTENT:START (METHODS) -->

## ast

### function assocNodeChild()

[source](https://github.com/brianneisler/firetree.git/tree/v0.1.2/src/ast/assocNodeChild.js#L5)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.1.0

<p>Assoc a node child within an AST. After the new <code>child</code> is inserted into the<br />
children, all Nodes in <code>node</code> will be re-identified.</p>

**Params**

<p><code>context</code>: <code>Context</code> - The current parser Context</p>
<p><code>index</code>: <code>Integer</code> - The child index to assoc</p>
<p><code>child</code>: <code>Node</code> - The new child to place at the given `index`</p>
<p><code>node</code>: <code>Node</code> - The target Node whose child is being assoc&#39;d</p>

**Returns**
<br /><p><code>Node</code> - A new copy of the Node with the child assoc&#39;d</p>

**Example**

```js

```

<br /><br />

## context

### function setupContext()

[source](https://github.com/brianneisler/firetree.git/tree/v0.1.2/src/context/setupContext.js#L59)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.1.0

<p>Sets up the Context object for use by the parser and generator</p>

**Params**
None

**Returns**
<br /><p><code>Context</code> - </p>

**Example**

```js
const contxt = setupContext()
```

<br /><br />

## generator

### function generate()

[source](https://github.com/brianneisler/firetree.git/tree/v0.1.2/src/generator/generate.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.1.0

<p>Generates a rules file from the given <code>ast</code> or <code>tokenList</code> and outputs the<br />
rules to the given <code>outpitFilePath</code>. If no <code>outputFilePath</code> is given, a<br />
string is returned.</p>

**Params**

<p><code>context</code>: <code>Context</code> - </p>
<p><code>options</code>: <code>{<br />
  ast: AST,<br />
  outputFilePath: String,<br />
  tokenList: List&lt;Token&gt;<br />
}}</code> - </p>

**Returns**
<br /><p><code>String</code> - </p>

**Example**

```js
import { generate, parse, setupContext } from 'firetree'

const context = setupContext()

// parse rules into an AST
const ast = await parse(context, {
  string: 'function () { return true }'
})

// generate rules and output to file
const ast = await generate(context, {
  ast,
  outputFilePath: 'path/to/firestore.rules'
})
```

<br /><br />

## parser

### function parse()

[source](https://github.com/brianneisler/firetree.git/tree/v0.1.2/src/parser/parse.js#L4)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.1.0

<p>parses the rules file at the given <code>filePath</code> or parse the given <code>string</code>.</p>

**Params**

<p><code>context</code>: <code>Context</code> - </p>
<p><code>options</code>: <code>{<br />
  filePath: String,<br />
  string: String<br />
}}</code> - </p>

**Returns**
<br /><p><code>AST</code> - </p>

**Example**

```js
import { parse, setupContext } from 'firetree'

const context = setupContext()

// parse file into an AST
const ast = await parse(context, {
  filePath: './path/to/firestore.rules'
})

// parse string into an AST
const ast = await parse(context, {
  string: someRulesString
})
```

<br /><br />

## lang.util

### **private** function cacheChain()

[source](https://github.com/brianneisler/firetree.git/tree/v0.1.2/src/utils/cacheChain.js#L42)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.1.0

<p>This method generates a specific object instance for use in a WeakMap cache.<br />
The object instance is unique based upon the parameters that are passed to<br />
the this method.</p>
<p>The main use of this method is for generating cache keys for memoization and<br />
automatically clearing the cache when a value no longer exists in memory.</p>
<p>When a non immutable object is passed as an argument it will be stored into a<br />
WeakMap as part of a chain. If that object is ever removed from memory all<br />
cache chains connected to the object will automatically be removed from the cache.</p>

**Params**

<p><code>args</code>: <code>...&ast;</code> - The arguments to generate a cache key for</p>

**Returns**
<br /><p><code>Object</code> - The cache key</p>

**Example**

```js

```

<br /><br />

### **private** function functionDefineLength()

[source](https://github.com/brianneisler/firetree.git/tree/v0.1.2/src/utils/functionDefineLength.js#L55)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; since v0.1.0

<p>Defines <code>length</code> for the given <code>func</code></p>
<p>Note: This mutates <code>func</code></p>

**Params**

<p><code>func</code>: <code>Function</code> - The function to define the length of.</p>
<p><code>length</code>: <code>Number</code> - The length of the function parameters.</p>

**Returns**
<br /><p><code>Function</code> - The `func` function.</p>

**Example**

```js
const result = functionDefineLength(function (abc) {}, 2)
result.length
//=> 2
```

<br /><br />

<!-- AUTO-GENERATED-CONTENT:END -->

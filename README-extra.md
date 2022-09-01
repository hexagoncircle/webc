
## TODOs

* CSS: error/warn when a CSS selector was not used via https://github.com/Polymer/css-select-parse5-adapter
* Output to stream?
* Option to bundle style/script to defer/async bundles `<style webc:async>`
* Options to set override default formats for `<template type>`, `<style type>`, and `<script type>`
* ~~single tags e.g. <img>~~
* ~~Use <body> and <html> in the content~~
* ~~Use a doctype~~
* ~~Option to compile away the parent element (automatic when no style or script)~~

## Idea graveyard

~~* Components are compiled to server and/or client modes (or mix and match both)~~
~~* What’s the difference between `webc:keep` and `webc:raw` Can we combine them??~~

## Notes

* Attribute name considerations https://www.razzed.com/2009/01/30/valid-characters-in-attribute-names-in-htmlxml/

Marketing ideas:
* Tired of waiting for browser support for Declarative Shadow DOM? Don’t want the performance/functionality fallbacks from the polyfill?
* Show a component with clientside support and registration
* Show an example of using declarative shadow DOM with this.

## HTML

* ~Version 2: preprocess using another file extension? e.g. `.webc.html`, `.webc.liquid`, `.webc.md`
* ~~TODO `<slot>` for server slots (maintain `<slot>` as is)~~
* ~~TODO? compilation: how to use template literals in `<template>`~~ instead use `<script type="webc/render">`

## Style

* Use `<link rel="stylesheet" href>` for remote CSS
* Compilation via `<style type>`: e.g. `<style type="sass">` to another not-CSS language
  * maybe also support `text/sass`?
  * Ignoring `type="text/css"`
~~* TODO Compilation: automatically bundle away `<style>`? Or use `<style bundle>` aggregates to page bundle~~
* If styles are NOT scoped include a unique component classname checker with error messaging for duplicate classname re-use.

* ~Version 2: Compilation: `<style webc:src>` inlines the thing
* ~Version 2: Compilation: `<link rel="stylesheet" href webc:scoped>`

## Script

* `<script>` for client JS
* `<script type="webc">` follows 11ty.js conventions for js (optional exports for `data` and `render`)
* maybe: `<script type="webc/data">`
* maybe: `<script type="webc/render">`
* TODO: how to serialize data/props for use on the client
* TODO: how to differentiate server and client js

* ~Version 2: Compilation: `<script type="ts">`

## Open Questions

* Integration with `<is-land>`

---


## Prior Art

### Vue

https://vuejs.org/guide/scaling-up/sfc.html#why-sfc

(implied component name via filename)
<template></template>
<template src></template>
<template lang></template>

<style></style>
<style scoped></style>
<style module></style>
<style module="jsVarName"></style>
<style src></style> 😅
<style lang></style>

<script></script> (implied ESM) (runs once?)
<script setup></script> (runs per instance)
<script src></script>
<script lang></script>

### Svelte

No `template` (just sibling content)

<style></style>
<style scoped></style>

<script></script> (runs per instance?)
<script context="module"></script> (runs once)

### Astro

https://docs.astro.build/en/reference/directives-reference/

[is:raw]
[client:only]





---
SFC inspiration

https://dotnet.microsoft.com/en-us/learn/aspnet/blazor-tutorial/add
# Demo: Particles animation with gravity

Simple project for didactic purposes illustrating javascript driven animations
as well as simple application architecture approaches

# Variants

Each variant of this demo is located in it's own branch:

- master: OOP version, canvas animation
- oop-dom-style-attr: OOP version, dom style attribute animation

This suffers from GC lag due to heavy object creation

- TODO: oop-canvas-composition: OOP version that favors composition over inheritence
- TODO: oop-canvas-di: OOP version with dependency injection
- TODO: func-dom-style-attr: functional style, unidirectional dataflow DOM style attribute animation
- TODO: func-canvas: functional style, UDF canvas
- TODO: oop-optimization: OOP optimized version
- TODO: func-optimization: functional style optimized version

# Develop:

To develop you need:

- node v5.7.0
- npm v3.6.0

Other versions might work but I haven't tested them

Note: installation process uses npm-shrinkwrap.json file.

## Watch changes and autobuild

```
$ npm install
$ ./node_modules/.bin/gulp watch
```

Warning: the build system is not quite friendly

# TODOs

* pause
* slow motion
* raf does not trigger when tab not in focus
* max particles slider
* display current particles count
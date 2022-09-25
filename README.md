# Tree-Shaking experiment for self-styled Web Components

This is an experiment in packaging up web components with the following requirements:

* the consumer of the components package should be able to reference any number of components via a single package-level import; we do not want to make them import 10 different modules to access 10 components.
* the consumer of the components package should not need to worry about configuring their bundler to handle `.css` or any other imports than standard `.js` and `.d.ts` files. The components package should _only_ expose `.js` and `.d.ts` files.
* it should expose type information for the component and other code via `.d.ts` files.
* it should support tree-shaking: if a consumer uses one component they should not embed code or styling of any other components.
* component authoring should be able to use SCSS or similar CSS-generation technology.
* the distributed bundle should include references to third party libraries instead of including them in the bundle; this allows for independent upgrade in the event of security patches or other upgrades being necessary.

## Implementation

* We use [lit](https://lit.dev/) to develop the web components
* We use sass to help generate CSS from `.scss` files
* We use [rollup](https://rollupjs.org/guide/en/) to package up the components

## Packaging

Tree-shaking often works by skipping the import of a module if none of its imports are actually used. Therefore, a simple way to achieve per-component tree-shaking is to build each component into its own separate ES module.

We configure rollup in the component package to:

* produce a separate chunk module for each component; the chunk includes the code and styling for that component, so the entire code and styling will be tree-shaken on a component-by-component basis
* generate a single top-level importable module which exposes all of the components
* not bundle `lit` or `tslib` or other third party dependencies

# Usage

* `git clone` the repository
* `npm install` at the top level
* `npm run dev`
  * runs rollup in watch mode in the components package
  * runs a separate rollup in watch mode in the apps/vanilla package, and a demo server listening on port `10001`
* open browser to http://localhost:10001
* edit `apps/vanilla/index.js` to select which component(s) to bring in, and examine the resulting `apps/vanilla/dist/index.js`
  
# TODO

Changes to code produce new hashed chunks; nothing clears up the old chunk files
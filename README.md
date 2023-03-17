# Grafana/Experimental Treeshaking sandbox

This repo is a testbed for checking the treeshaking abilities of a component library such as grafana/experimental or grafana/ui.

Based on the create-react-app typescript template with craco added to resolve bundling issues with node polyfills and various nested dependencies of the grafana packages. Adds a `yarn analyze` script using source-map-explorer to better understand what is being bundled.

## Initial run (`@grafana/experimental@1.1.0`)

After a clean install of `yarn create react-app experimental-treeshake --template typescript` and `yarn build` we get:

```shell
File sizes after gzip:
  43.76 kB  build/static/js/main.9ef7c0f1.js
  1.79 kB   build/static/js/787.d942f317.chunk.js
  541 B     build/static/css/main.073c9b0a.css
```

Adding a simple component from `@grafana/experimental` to the mix:

```typescript
import { EditorRow } from "@grafana/experimental";
```

```shell
File sizes after gzip:
  894.38 kB  build/static/js/main.7248e34a.js
  5.62 kB    build/static/js/react-monaco-editor.18ae632f.chunk.js
  1.79 kB    build/static/js/787.d942f317.chunk.js
  541 B      build/static/css/main.073c9b0a.css
```

After updating the rollup configs to produce an esm build:

```shell
File sizes after gzip:
  183.38 kB (-730.77 kB)  build/static/js/main.0fe9360c.js
  1.79 kB                 build/static/js/787.d942f317.chunk.js
  541 B                   build/static/css/main.073c9b0a.css
```

Introduce `sideEffects: false` to package.json:

```shell
File sizes after gzip:
  91.15 kB (-92.23 kB)  build/static/js/main.453b11db.js
  1.79 kB               build/static/js/787.d942f317.chunk.js
  541 B                 build/static/css/main.073c9b0a.css
```

Publish to local verdaccio npm registry so webpack doesn't bundle multiple copies of react:

```shell
File sizes after gzip:
  89.5 kB (-1.65 kB)  build/static/js/main.fe00af40.js
  1.79 kB               build/static/js/787.d942f317.chunk.js
  541 B                 build/static/css/main.073c9b0a.css
```

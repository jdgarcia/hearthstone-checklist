# Hearthstone Checklist
A checklist app for your Hearthstone collection.

## Required for building
```
npm install -g ncp
npm install -g babel-cli
npm install -g browserify
```

## Building
```
ncp src build
babel --presets react src --out-dir build
browserify build\index.js -o build\bundle.js
```

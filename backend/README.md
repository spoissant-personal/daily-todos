# daily-todos backend
Simple REST backend with CRUD operations for todos using a very basic file storage. This was meant as an execrise to familiarize myself with node and express.

## Requirements
Node 12+ (developed on `12.10.0`) is required because of the use of the `"type": "module"` in package.json to support ES6 modules without the need for babel. Ironically since jest does not support ES6 modules yet (https://github.com/facebook/jest/issues/9430) I still had to include babel...)

# Installation
```
npm install
```

# Development
```
npm run debug
```

# Production (Who am I kidding :P)
```
npm start
```

# Testing
```
npm test
```
If you are in `Visual Studio Code` and you have the `REST Client` extension you can also open the `tests/http.rest` file and do some testing. Note that http.rest assumes that `data/data.json` (The persistent store file) contains 2 todos already but you could easily adjust it for a different scenario.
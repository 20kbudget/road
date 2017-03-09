# road

An incomplete game of cars used as playground / sandbox 
to test some personal ideas about game development in javascript.

At the current state shouldnt be useful for anyone, just a pile of garbage.

But feel free to read through anyways :)

## Requirements

- node
- yarn
- cordova

## Installation

```
yarn install
yarn create
yarn fixdependencies (while [this bug][humantimebug] is open)
```
 
## Test in the browser

```
yarn start
```

## Generate dev bundles and copy to Cordova subfolder

```
yarn build
```

## Test with the device plugged

```
yarn debug
```

## Generate a minified / optimized build

```
yarn release
```

## Credits

Assets by [Kenney][kenney]:

- [Play / Pause icons][pause]
- [Car, roads][race]

## License

Copyright 2017 Fabricio Campos Zuardi and AUTHORS

This game is licensed under the AGPL v3.0 see LICENSE

[kenney]: http://kenney.nl/
[pause]: http://kenney.nl/assets/game-icons
[race]: http://kenney.nl/assets/racing-pack
[humantimebug]: https://github.com/danasilver/tiny-human-time/issues/6


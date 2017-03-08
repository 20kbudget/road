const initialState = require('./src/state');
const domSetup = require('./src/dom');
const setupReducers = require('./src/reducers');
const setupEffects = require('./src/effects');
const setupDebug = require('./src/debug');

const main = () => {
    let state = initialState();
    domSetup({ state, root: document.body });
    setupReducers(state);
    setupEffects(state);
    setupDebug(state);

    state.bus.emit('textures:load', Object.keys(state.textures));
};

if (window.cordova) {
    document.addEventListener('deviceready', main, false);
} else {
    main();
}

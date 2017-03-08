const initialState = require('./src/state');
const domSetup = require('./src/dom');
const setupReducers = require('./src/reducers');
const setupEffects = require('./src/effects');

const main = () => {
    let state = initialState();
    let { bus } = state;
    domSetup({ state, root: document.body });
    setupReducers(state);
    setupEffects(state);

    if (state.debug) {
        bus.on(
            '*',
            (eventName, data) =>
                eventName !== 'tick' ? console.log(eventName, data) : null
        );
    }

    bus.emit('textures:load', Object.keys(state.textures));
};

if (window.cordova) {
    document.addEventListener('deviceready', main, false);
} else {
    main();
}

const initialState = require('./src/state');
const domSetup = require('./src/dom');
const setupReducers = require('./src/reducers');
const setupEffects = require('./src/effects');
const humanize = require('tiny-human-time');

const main = () => {
    let state = initialState();
    let { bus } = state;
    domSetup({ state, root: document.body });
    setupReducers(state);
    setupEffects(state);

    if (state.debug) {
        let lastTime = window.performance.now();
        bus.on(
            '*',
            (eventName, data) => {
                if (eventName === 'tick') { return };
                const now = window.performance.now();
                console.log(eventName, humanize(now, 'short'), humanize(now, lastTime), data)
                lastTime = now;
            }
        );
    }

    bus.emit('textures:load', Object.keys(state.textures));
};

if (window.cordova) {
    document.addEventListener('deviceready', main, false);
} else {
    main();
}

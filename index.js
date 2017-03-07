const ticker = require('ticker');
const initialState = require('./src/state');
const domSetup = require('./src/dom');
const buildStage = require('./src/stage');

const main = () => {
    let state = initialState();
    domSetup({ state, root: document.body });
    buildStage(state, state.bus);
    state.bus.on('stageReady', () => {
        ticker(state.view, state.framerate)
            .on('draw', state.draw)
            .on('tick', state.tick);
    });
    state.bus.on('tick', () => {
        let road = state.stage.children[0];
        road.y = (road.y + 6) % 128 - 128;
    });
};

// if inside cordova wrapper, wait for deviceready
if (window.cordova) {
    document.addEventListener('deviceready', main, false);
} else {
    main();
}

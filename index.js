const nanobus = require('nanobus');
const ticker = require('ticker');
const Stats = require('stats.js');

const initialState = require('./src/state');
const buildStage = require('./src/stage');

const main = () => {
    let state = initialState();
    const bus = nanobus();
    const draw = () => state.renderer.render(state.stage);
    const tick = () => bus.emit('tick');
    const stats = new Stats();
    const debugDraw = () => {
        stats.begin();
        draw();
        stats.end();
    };

    document.body.className = state.bodyClassName;
    document.body.appendChild(state.view);
    if (state.debug) {
        stats.showPanel(0);
        document.body.appendChild(stats.dom);
    }
    buildStage(state, bus);

    bus.on('stageReady', () => {
        ticker(state.view, state.framerate)
            .on('draw', state.debug ? debugDraw : draw)
            .on('tick', tick);
    });
};

// if inside cordova wrapper, wait for deviceready
if (window.cordova) {
    document.addEventListener('deviceready', main, false);
} else {
    main();
}

// ---- OLD STUFF TO DELETE --
// const { BlurFilter } = filters;

// // settings.TARGET_FPMS = 0.01;

// let speed = 0.1;
// const maxSpeed = 10;
// const acceleration = 1.05;
// const resistence = 0.99;
// let accelerating = false;
// let d = 0;

// speed = accelerating
// ? Math.min(speed * acceleration, maxSpeed)
// : speed * resistence;
// if (speed <= 0.1) {
// speed = 0.1;
// d = 0;
// return;
// }
// this.road.y = Math.round(-128 + (this.road.y + d * speed) % 128);
// this.blur.blurY = speed * 0.8;
// this.blur.blurX = speed * 0.15;
// d = 0;
// };

// const blur = new BlurFilter();
// blur.blurX = 0;
// blur.blurY = 0;
// road.filters = [blur];

// stage.on('pointerdown', () => {
// accelerating = true;
// });
// stage.on('pointerup', () => {
// accelerating = false;
// });

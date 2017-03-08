const extend = require('xtend');
const nanobus = require('nanobus');
const Stats = require('stats.js');
const { Container } = require('pixi.js');
const { autoDetectRenderer } = require('./custompixi');
const classNames = require('./styles');

const baseState = {
    framerate: 40,
    debug: true,
    paused: false,
    dimensions: [384, 640],
    rendererOptions: {
        autoResize: true,
        forceFXAA: true,
        roundPixels: true,
        backgroundColor: 0x111111
    },
    textures: {
        // playIcon: {
            // url: './assets/right.png',
            // size: 15312
        // },
        // pauseIcon: {
            // url: './assets/pause.png',
            // size: 15197
        // },
        playerCar: {
            url: './assets/car_red_small_4.png',
            size: 703
        }
    },
    loading: {
        total: 0,
        current: 0
    }
};

let initialState = () => {
    const bus = nanobus();
    const renderer = autoDetectRenderer(...baseState.dimensions, ...baseState.rendererOptions);
    const { view } = renderer;
    const stage = new Container();
    const branch = (flag, a, b) => flag ? a : b;
    const stageRender = () => renderer.render(stage);
    const debugDraw = () => {
        stats.begin();
        stageRender();
        stats.end();
    };
    const nullFn = () => null;
    const draw = () =>
        branch(
            state.paused,
            nullFn,
            branch(state.debug, debugDraw, stageRender)
        )();
    const tick = () => branch(state.paused, nullFn, () => bus.emit('tick'))();
    const stats = new Stats();
    const debugDiv = stats.dom;
    stats.showPanel(0);

    const state = extend(baseState, {
        bus,
        renderer,
        view,
        stage,
        draw,
        debugDiv,
        tick,
        classNames
    });

    return state;
};

module.exports = initialState;

const extend = require('xtend');
const nanobus = require('nanobus');
const Stats = require('stats.js');
const { Container } = require('pixi.js');
const { autoDetectRenderer } = require('./custompixi');
// const { autoDetectRenderer, Container } = require('pixi.js');
const classNames = require('./styles');
const pauseToggle = require('./pauseToggle');

const baseState = {
    root: [
        {
            id: 'ui',
            pixiContainer: new Container(),
            children: [pauseToggle]
        }
    ],
    textures: {
        pauseIcon: {
            url: './assets/pause.png',
            size: 15197
        },
        playIcon: {
            url: './assets/right.png',
            size: 15312
        },
        playerCar: {
            url: './assets/car_red_small_4.png',
            size: 703
        }
    },
    framerate: 40,
    debug: true,
    paused: true,
    rendererOptions: {
        autoResize: true,
        forceFXAA: true,
        roundPixels: true,
        backgroundColor: 0x111111
    },
    loading: {
        total: 0,
        current: 0
    },
    loadedTextures: []
};

const branch = (flag, a, b) => flag ? a : b;
const nullFn = () => null;

let initialState = () => {
    const bus = nanobus();
    const windowDimensions = [window.innerWidth, window.innerHeight];
    const renderer = autoDetectRenderer(
        ...windowDimensions,
        ...baseState.rendererOptions
    );
    const { view } = renderer;
    const stage = new Container();
    const layerContainers = baseState.root.map(child => child.pixiContainer);
    stage.addChild(...layerContainers);
    const stageRender = () => renderer.render(stage);
    const debugDraw = () => {
        if (!state.paused) {
            stats.begin();
        }
        stageRender();
        if (!state.paused) {
            stats.end();
        }
    };
    const draw = () => branch(state.debug, debugDraw, stageRender)();
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

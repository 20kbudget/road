const extend = require('xtend');
const nanobus = require('nanobus');
const Stats = require('stats.js');
const { Container } = require('pixi.js');
const { autoDetectRenderer } = require('./custompixi');
// const { autoDetectRenderer, Container } = require('pixi.js');
const classNames = require('./styles');

const baseState = {
    framerate: 40,
    debug: true,
    paused: false,
    rendererOptions: {
        autoResize: true,
        forceFXAA: true,
        roundPixels: true,
        backgroundColor: 0x111111
    },
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
    loadedTextures: [],
    loading: {
        total: 0,
        current: 0
    },
    layers: {
        background: new Container(),
        player: new Container(),
        ui: new Container()
    }
};

const branch = (flag, a, b) => flag ? a : b;
const nullFn = () => null;

let initialState = () => {
    const bus = nanobus();
    const windowDimensions = [window.innerWidth, window.innerHeight]
    const renderer = autoDetectRenderer(
        ...windowDimensions,
        ...baseState.rendererOptions
    );
    const { view } = renderer;
    const stage = new Container();
    const layerContainers = Object.values(baseState.layers);
    stage.addChild(...layerContainers);
    const stageRender = () => renderer.render(stage);
    const debugDraw = () => {
        stats.begin();
        stageRender();
        stats.end();
    };
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

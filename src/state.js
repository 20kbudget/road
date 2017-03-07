const nanobus = require('nanobus');
const Stats = require('stats.js');
const { autoDetectRenderer, Container } = require('./custompixi');
const classNames = require('./styles');

const framerate = 40;
const debug = true;
const dimensions = [384, 640];
const rendererOptions = {
    autoResize: true,
    forceFXAA: true,
    roundPixels: true,
    backgroundColor: 0x111111
};

let initialState = () => {
    const bus = nanobus();
    const renderer = autoDetectRenderer(...dimensions, ...rendererOptions);
    const { view } = renderer;
    const stage = new Container();
    const tick = () => bus.emit('tick');
    const draw = () => renderer.render(stage);
    const stats = new Stats();
    const debugDiv = stats.dom;
    const debugDraw = () => {
        stats.begin();
        draw();
        stats.end();
    };
    stats.showPanel(0);

    const state = {
        framerate,
        debug,
        classNames,
        bus,
        renderer,
        view,
        stage,
        draw: debug ? debugDraw : draw,
        debugDiv,
        tick
    };

    return state;
};

module.exports = initialState;

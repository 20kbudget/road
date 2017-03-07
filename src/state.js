const { autoDetectRenderer, Container } = require('./custompixi');
const styles = require('./styles');

const framerate = 30;
const debug = true;
const dimensions = [384, 640];
const rendererOptions = {
    autoResize: true,
    forceFXAA: true,
    roundPixels: true,
    backgroundColor: 0x111111
};
const bodyClassName = styles.body;

let initialState = () => {
    const renderer = autoDetectRenderer(...dimensions, ...rendererOptions);
    const { view } = renderer;
    const stage = new Container();

    view.className = styles.canvas;
    
    const state = {
        bodyClassName,
        framerate,
        debug,
        renderer,
        view,
        stage
    };
    return state;
};

module.exports = initialState;

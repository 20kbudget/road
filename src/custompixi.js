// better defaults for Pixi.js
// -----
const Pixi = require('pixi.js');

const {
    autoDetectRenderer: pixiAutoDetectRenderer
} = Pixi;

const autoDetectRenderer = (...args) => {
    const renderer = pixiAutoDetectRenderer(...args);
    renderer.plugins.interaction.destroy();
    delete renderer.plugins.interaction;
    return renderer;
};

module.exports = {
    autoDetectRenderer
};

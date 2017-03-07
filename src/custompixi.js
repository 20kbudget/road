// better defaults for Pixi.js
// -----
const Pixi = require('pixi.js');

// unchanged
const { Container } = Pixi;

// customized
const {
    autoDetectRenderer: pixiAutoDetectRenderer
} = Pixi;

const autoDetectRenderer = (...args) => {
    const renderer = pixiAutoDetectRenderer(...args);
    renderer.plugins.interaction.destroy();
    delete renderer.plugins.interaction;
    console.log(renderer.plugins)
    return renderer;
};

module.exports = {
    Container,
    autoDetectRenderer
};

const ticker = require('ticker');
const { BaseTexture, Texture } = require('pixi.js');

const setup = state => {
    const loadTextures = idList => {
        idList.forEach(id => {
            const { url, size } = state.textures[id];
            let texture = BaseTexture.fromImage(url);
            texture.on('loaded', base => {
                const texture = new Texture(base);
                bus.emit('texture:loaded', { id, size, texture });
            });
        });
    };

    const startLoop = () =>
        ticker(state.view, state.framerate)
            .on('draw', state.draw)
            .on('tick', state.tick);

    const bus = state.bus;
    bus.on('textures:load', loadTextures);
    bus.on('loaded', startLoop);
};

module.exports = setup;

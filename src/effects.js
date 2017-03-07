const ticker = require('ticker');
const { BaseTexture, Texture } = require('pixi.js');
const setup = state => {
    const bus = state.bus;

    const loadTextures = idList => {
        idList.forEach(id => {
            let texture = BaseTexture.fromImage(state.textures[id]);
            texture.on('loaded', base => {
                const texture = new Texture(base)
                bus.emit('texture:loaded', {id, texture});
            });
        });
    };
    
    const startLoop = () =>
        ticker(state.view, state.framerate)
            .on('draw', state.draw)
            .on('tick', state.tick);

    bus.on('textures:load', loadTextures);
    bus.on('loop:start', startLoop);
};

module.exports = setup;

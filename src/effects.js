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

    const texturesReady = ({ id, requiredTextures }) => {
        const remainingTextures = requiredTextures.filter(
            i => i !== id && !state.loadedTextures.includes(i)
        );
        if (remainingTextures.length > 0) {
            return false;
        }
        return true;
    };

    const loadListener = (component, cb, listener) =>
        function listener({ id, texture }) {
            const requiredTextures = component.textures;
            if (requiredTextures.indexOf(id) === -1) {
                return null;
            }
            if (!texturesReady({ id, requiredTextures })) {
                return null;
            }
            bus.removeListener('texture:loaded', listener);
            return cb();
        };

    const bus = state.bus;
    const pauseToggle = state.root[0].children[0];
    const pauseLoadMonitor = loadListener(
        pauseToggle,
        pauseToggle.setup(state),
        pauseLoadMonitor
    );
    bus.on('textures:load', loadTextures);
    bus.on('texture:loaded', pauseLoadMonitor);
    bus.on('loaded', startLoop);
};

module.exports = setup;

const { Sprite } = require('pixi.js');
const setup = state => {
    const bus = state.bus;

    const computeTexturesSize = idList => {
        const increment = idList.reduce(
            (acc, id) => acc + state.textures[id].size,
            0
        );
        const { current, total } = state.loading;
        const newTotal = total + increment;
        const progress = current / newTotal;
        bus.emit('loading:progress', { progress });

        // mutate state
        state.loading.total = newTotal;
    };

    const incrementLoadingProgress = ({ size }) => {
        const { current, total } = state.loading;
        const newCurrent = current + size;
        const progress = newCurrent / total;
        bus.emit('loading:progress', { progress });
        if (progress === 1) {
            bus.emit('loaded', { size: newCurrent });
        }

        // mutate state
        state.loading.current = newCurrent;
    };

    const updateLoadedTextures = ({ id, texture }) => {
        // mutate state
        state.loadedTextures.push(id);
        state.textures[id].texture = texture;
    };

    const texturesReady = ({ id, requiredTextures }) => {
        const remainingTextures = requiredTextures.filter(
            i => i !== id && !state.loadedTextures.includes(i)
        );
        if (remainingTextures.length > 0) {
            return false;
        }
        return true;
    };

    const pauseToggle = ({ id, texture }) => {
        const requiredTextures = ['pauseIcon', 'playIcon'];
        if (requiredTextures.indexOf(id) === -1) {
            return false;
        }
        if (!texturesReady({ id, requiredTextures })) {
            return null;
        }
        bus.removeListener('texture:loaded', pauseToggle);
        console.log('ready to build component');
    };

    bus.on('textures:load', computeTexturesSize);
    bus.on('texture:loaded', incrementLoadingProgress);
    bus.on('texture:loaded', updateLoadedTextures);
    bus.on('texture:loaded', pauseToggle);
};

module.exports = setup;

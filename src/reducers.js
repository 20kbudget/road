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

    const addSprite = ({ id, texture }) => {
        let sprite = new Sprite(texture);
        sprite.anchor.set(0.5);
        // visual debug
        sprite.position.set(state.view.width / 2, state.view.height / 2);

        // mutate state
        state.sprites[id] = sprite;
        state.stage.addChild(sprite);
    };

    bus.on('textures:load', computeTexturesSize);
    bus.on('texture:loaded', incrementLoadingProgress);
    // bus.on('texture:loaded', addSprite);
};

module.exports = setup;

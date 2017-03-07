const { Sprite } = require('pixi.js');
const setup = state => {
    const bus = state.bus;

    const addSprite = ({ id, texture }) => {
        let sprite = new Sprite(texture);
        sprite.anchor.set(0.5);
        // visual debug
        sprite.position.set(state.view.width / 2, state.view.height / 2);

        // mutate state
        state.sprites[id] = sprite;
        state.stage.addChild(sprite);
    };

    bus.on('texture:loaded', addSprite);
};

module.exports = setup;

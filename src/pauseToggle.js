const { Sprite, Container } = require('pixi.js');

const setup = state =>
    () => {
        const bus = state.bus;
        const pause = new Sprite(state.textures.pauseIcon.texture);
        const play = new Sprite(state.textures.playIcon.texture);
        const sprite = new Container();
        const render = ({ paused }) => {
            play.visible = paused;
            pause.visible = !paused;
        };
        sprite.addChild(pause, play);
        sprite.children.forEach(icon => {
            icon.anchor.set(0, 1);
            icon.scale.set(0.5);
            icon.position.set(0, state.view.height);
        });
        render({ paused: state.paused });

        bus.on('pause:updated', render);
        bus.on('pointerdown', event => {
            const { clientX, clientY } = event;
            if (!sprite.getBounds().contains(clientX, clientY)) {
                return null;
            }
            bus.emit('ui:pauseToggle:click', { sprite, paused: play.visible });
        });

        bus.emit('component:ready', { sprite });
    };

const component = {
    id: 'pauseToggle',
    textures: ['pauseIcon', 'playIcon'],
    setup
};

module.exports = component;

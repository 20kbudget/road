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

    const updatePauseState = ({ sprite, paused }) => {
        const newValue = !paused;
        bus.emit('pause:updated', {paused:newValue, sprite});

        // mut
        state.paused = newValue;
    };

    const addPauseToggle = ({sprite}) => {
        // mut
        state.root.find(child => child.id === 'ui').pixiContainer.addChild(sprite);
    }

    bus.on('textures:load', computeTexturesSize);
    bus.on('texture:loaded', incrementLoadingProgress);
    bus.on('texture:loaded', updateLoadedTextures);
    bus.on('component:ready', addPauseToggle)
    bus.on('ui:pauseToggle:click', updatePauseState)
};

module.exports = setup;

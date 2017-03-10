const appendNodes = ({ state, root }) => {
    root.appendChild(state.view);
    if (state.debug) {
        root.appendChild(state.debugDiv);
    }
};

const styleNodes = ({ state, root }) => {
    state.view.className = state.classNames.canvas;
    root.className = state.classNames.body;
};

const normalizePointerEvent = event => {
    // mut
    if (!event.clientX && event.touches && event.touches[0]) {
        event.clientX = event.touches[0].clientX;
        event.clientY = event.touches[0].clientY;
    }
};

const emitPointerEvents = ({ state }) => {
    const bus = state.bus;
    const hasPointer = window.PointerEvent !== undefined;
    const hasTouch = window.TouchEvent !== undefined;
    const eventNames = {
        start: hasPointer
            ? 'pointerdown'
            : hasTouch ? 'touchstart' : 'mousedown'
    };
    state.view.addEventListener(eventNames.start, event => {
        event.preventDefault();
        normalizePointerEvent(event);
        bus.emit('pointerdown', { event });
    });
};

module.exports = args => {
    appendNodes(args);
    styleNodes(args);
    emitPointerEvents(args);
};

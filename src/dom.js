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

module.exports = args => {
    appendNodes(args);
    styleNodes(args);
};

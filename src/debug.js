const humanize = require('tiny-human-time');
const setup = state => {
    if (state.debug) {
        let lastTime = window.performance.now();
        state.bus.on('*', (eventName, data) => {
            if (eventName === 'tick') {
                return;
            }
            const now = window.performance.now();
            console.log(
                eventName,
                humanize(now, 'short'),
                humanize(now, lastTime),
                data
            );
            lastTime = now;
        });
    }
};

module.exports = setup;

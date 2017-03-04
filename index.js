const { Application } = require('pixi.js');
const pull = require('pull-stream')
const tickSource = require('pull-pixi-tick').source

const styles = require('./src/styles');
const buildRoad = require('./src/road');

const { view, stage, renderer, ticker } = new Application();
view.className = styles.canvas;

const speed = 6.4;
const sink = sprite => read => {
    const next = (err, deltaTime) => {
        if (err) {
            return console.log(err)
        }
        sprite.y = -128 + (sprite.y + deltaTime * speed) % 128;
        read(null, next);
    }
    read(null, next);
}

const init = () => {
    renderer.roundPixels = true
    document.body.appendChild(view);
    console.log(view.offsetHeight)
    buildRoad(renderer, view.offsetHeight + 128 * 2, road => {
        pull(
            tickSource(ticker),
            sink(road)
        )
        stage.addChild(road);
    });
};

if (window.cordova) {
    document.addEventListener('deviceready', init, false);
} else {
    init();
}

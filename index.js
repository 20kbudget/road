const { Application } = require('pixi.js');
const pull = require('pull-stream')
const tickThrough = require('pull-pixi-tick')

const styles = require('./src/styles');
const buildRoad = require('./src/road');

const { view, stage, renderer, ticker } = new Application();
view.className = styles.canvas;

const sink = sprite => read => {
    const next = (err, data) => {
        if (err) {
            return console.log(err)
        }
        sprite.y = data;
        read(null, next);
    }
    read(null, next);
}

const init = () => {
    document.body.appendChild(view);
    console.log(view.offsetHeight)
    buildRoad(renderer, view.offsetHeight, road => {
        pull(
            pull.count(310),
            tickThrough(ticker),
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

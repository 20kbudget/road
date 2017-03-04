const { Application } = require('pixi.js');

const styles = require('./src/styles');
const buildRoad = require('./src/road');

const { view, stage, renderer } = new Application();
view.className = styles.canvas;

const init = () => {
    document.body.appendChild(view);
    buildRoad(renderer, 1000, road => {
        stage.addChild(road);
    });
};

if (window.cordova) {
    document.addEventListener('deviceready', init, false);
} else {
    init();
}

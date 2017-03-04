const { Application, Text } = require('pixi.js');

const styles = require('./src/styles');
const road = require('./src/road');

const { view, stage } =  new Application();
view.className = styles.canvas;

const init = () => {
    stage.addChild(road);
    document.body.appendChild(view);
};


if (window.cordova) {
    document.addEventListener('deviceready', init, false);
} else {
    init();
}


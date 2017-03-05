const { Application, settings, filters } = require('pixi.js');
const { BlurFilter } = filters;
const styles = require('./src/styles');
const buildRoad = require('./src/road');

const app = new Application();
const { view, stage, renderer, ticker: appTicker } = app;
view.className = styles.canvas;

// settings.TARGET_FPMS = 0.01;

let speed = 0.1;
const maxSpeed = 10;
const acceleration = 1.05;
const resistence = 0.99;
let accelerating = false;
let d = 0;
const onTick = function(deltaTime) {
    d += deltaTime;
    if (d < 1.3) {
        return;
    }
    speed = accelerating
        ? Math.min(speed * acceleration, maxSpeed)
        : speed * resistence;
    if (speed <= 0.1) {
        speed = 0.1;
        d = 0;
        return;
    }
    this.road.y = Math.round(-128 + (this.road.y + d * speed) % 128);
    this.blur.blurY = speed * 0.8;
    this.blur.blurX = speed * 0.15;
    d = 0;
};
const init = () => {
    document.body.appendChild(view);
    const screenHeight = view.offsetHeight;
    const roadHeight = screenHeight + 4 * 128;
    buildRoad(renderer, roadHeight, road => {
        const blur = new BlurFilter();
        blur.blurX = 0;
        blur.blurY = 0;
        road.filters = [blur];

        stage.addChild(road);
        appTicker.add(onTick.bind({ blur, road, screenHeight, speed }));
        stage.interactive = true;
        stage.on('pointerdown', () => {
            accelerating = true;
        });
        stage.on('pointerup', () => {
            accelerating = false;
        });
    });
};

if (window.cordova) {
    document.addEventListener('deviceready', init, false);
} else {
    init();
}

const { Container } = require('./custompixi');
const buildRoad = require('./road');

const roadReady = (stage, bus) => road => {
    stage.addChild(road);
    bus.emit('stageReady');
};

module.exports = ({ view, renderer, stage }, bus) => {
    const roadHeight = view.height;
    buildRoad(renderer, roadHeight, roadReady(stage, bus));
    return stage;
};

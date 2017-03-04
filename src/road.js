const { Texture, Container, Sprite, RenderTexture } = require('pixi.js');

const tileSize = 128;


let loadedTextures = 0;
const textures = [
    Texture.fromImage('./assets/road_asphalt21.png'),
    Texture.fromImage('./assets/road_asphalt22.png')
];
const textureLoaded = event => {
    if (event.baseTexture && event.baseTexture.hasLoaded){
        loadedTextures += 1;
    }
    if (loadedTextures === textures.length) {
        console.log('finished loading')
    }
}
textures.forEach(t => t.on('update', textureLoaded));

const roadSlice = () => {
    let slice = new Container();
    let left = new Sprite(textures[0]);
    let right = new Sprite(textures[0]);
    let center = new Sprite(textures[1]);
    right.rotation = Math.PI;
    center.position.set(tileSize, 0);
    right.position.set(2 * tileSize, tileSize);
    slice.addChild(left, center, right);
    return slice;
}

const road = roadSlice();

module.exports = road;

const {
    Texture,
    Container,
    Sprite,
    RenderTexture,
    extras
} = require('pixi.js');
const { TilingSprite } = extras;

const subtileSize = 128;
const tileDimensions = [3 * subtileSize, subtileSize];
const textures = [
    Texture.fromImage('./assets/road_asphalt21.png'),
    Texture.fromImage('./assets/road_asphalt22.png')
];

module.exports = (renderer, distance, cb) => loadTextures(textures => {
    const tile = roadSlice(textures);
    const tileTexture = RenderTexture.create(...tileDimensions);
    renderer.render(tile, tileTexture);
    const sprite = new TilingSprite(tileTexture, tileDimensions[0], distance);
    cb(sprite);
});

const loadTextures = cb => {
    let loadedTextures = 0;
    const textureLoaded = event => {
        if (event.baseTexture && event.baseTexture.hasLoaded) {
            loadedTextures += 1;
        }
        if (loadedTextures === textures.length) {
            // console.log('finished loading');
            cb(textures);
        }
    };
    textures.forEach(t => t.on('update', textureLoaded));
};

const roadSlice = textures => {
    const left = new Sprite(textures[0]);
    let center = new Sprite(textures[1]);
    let right = new Sprite(textures[0]);
    let slice = new Container();
    center.position.set(subtileSize, 0);
    right.rotation = Math.PI;
    right.position.set(2 * subtileSize, subtileSize);
    slice.addChild(left, center, right);
    return slice;
};

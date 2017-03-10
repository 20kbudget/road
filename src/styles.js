const css = require('sheetify');
const body = css`
    :host {
        overflow: hidden;
        width: 100%;
        height: 100%;
        touch-action: none;
        background-color: #111111;
    }
`
const canvas = css`
    :host {
        position:absolute;
        top:0;
        left:0;
    }
`;

module.exports = { canvas, body };

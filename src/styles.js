const css = require('sheetify');
const body = css`
    :host {
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
`
const canvas = css`
    :host {
        position:absolute;
        top:0;
        left:0;
        background-color: #111111;
        width: 100%;
        height: 100%;
    }
`;

module.exports = { canvas, body };

var curentPath = null,
    firstClickPosition = null;

/**
 * Draws a straight `<path>` (poligon) given the coordinates to insert a new point and closes the path if the new point is within 4 pixels from the starting point.
 * @param {Number} x The `x` coordinate.
 * @param {Number} y The `y` coordinate.
 */
function drawPolygon(x, y){
    if (!curentPath) {
        curentPath = Snap('#walls').path(Snap.format('M{x},{y}l0,1',{'x': x, 'y': y}));
        firstClickPosition = {'x': x, 'y': y};
    } else {
        if ((firstClickPosition.x - 4 <= x && x <= firstClickPosition.x + 4) && (firstClickPosition.y - 4 <= y && y <= firstClickPosition.y + 4)) {
            curentPath.node.setAttribute('d', Snap.format('{path}Z', {'path': curentPath.getSubpath(0, curentPath.getTotalLength())}));
            firstClickPosition = null;
            curentPath = null;
        } else {
            curentPath.node.setAttribute('d', Snap.format('{path}L{x},{y}',{'x': x, 'y': y, 'path': curentPath.getSubpath(0, curentPath.getTotalLength())}));
        }
    }
}

/**
 * Free hand path drawing function.
 */
function drawFreeHand(){
    //TODO
}

/**
 * Flushes the internal variables, thus reseting them.
 */
function flush(){
    curentPath = null;
    firstClickPosition = null;
}

/**
 * Draws the selected string into a given `layer` in the `x` and `y` coordinates.
 * @param {String} layer The layer id for lookup.
 * @param {Number} x The `x` coordinate to put the text.
 * @param {Number} y The `y` coordinate to put the text.
 * @param {(String|Array)} text The string or array of characters containig the text to be parsed.
 */
function drawText(layer, x, y, text){
    Snap(layer).text(x, y, text);
}

exports = {
    'drawPolygon': drawPolygon,
    'drawFreeHand': drawFreeHand,
    'flush': flush
};
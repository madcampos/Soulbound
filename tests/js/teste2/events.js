var curentPath = null,
    xPos = -1,
    yPos = -1,
    isEditing = false,
    isMoving = false,
    editingElement = null,
    mode = document.querySelector('.mode:checked').id;

function drawPolygon(map){
    if (!curentPath) {
        curentPath = map.walls.path(null, true).M({'x': xPos, 'y': yPos}).stroke({'color': 'red', 'width': 2, 'linejoin': 'round', 'linecap': 'round'}).attr('vector-effect', 'non-scaling-stroke').l({'x': 0, 'y': 1});
    } else {
        var firstClickPosition = curentPath.getSegment(0).coords;
        if ((firstClickPosition[0] - 4 <= xPos && xPos <= firstClickPosition[0] + 4) && (firstClickPosition[1] - 4 <= yPos && yPos <= firstClickPosition[1] + 4)) {
            curentPath.Z();
            curentPath.fill('gold');
            curentPath = null;
        } else {
            curentPath.L({'x': xPos, 'y': yPos});
        }
    }
}

function editObject(action, x, y){
    //TODO: rewrite shitty functions!
    if (isEditing) {
        var deltaX = x - firstClickPosition[0],
            deltaY = y - firstClickPosition[1],
            box = editingElement.rbox();
        switch (action) {
            case 'left':
                editingElement.transform({'scaleX': 1 + (deltaX / box.width), 'x': deltaX});
            break;
            case 'right':
                editingElement.transform({'scaleX': 1 + (deltaX / box.width), 'x': - deltaX, 'cx': box.width});
            break;
            case 'top':
                //TODO
            case 'bottom':
                //TODO
            break;
            case 'boundRect':
                editingElement.transform({'x': deltaX, 'y': deltaY});
            break;
            case 'rotator':
                //TODO
            break;
        }
        drawResizer(editingElement.rbox());
    }
}

function startEdittingElement(element){
    if (typeof element.parent.id == 'function') {
        if (element.parent.id() == 'resizer') {
            isEditing = true;
            firstClickPosition = [xPos, yPos];
        }
    }
}

function finishEdittingElement(element){
    if (typeof element.parent.id == 'function'){
        if (element.parent.id() !== ('resizer' || 'fogOfWar')) {
            editingElement = element;
            editingElement.front();
            drawResizer(element.rbox());
        }
    } else {
        if (!isEditing) {
            editingElement = null;
            resizer.hide();
        }
    }

    if (isEditing) {
        isEditing = false;
        firstClickPosition = [-1,-1];
    }
}

function up(evt){
    mode = document.querySelector('.mode:checked').id;
    xPos = evt.layerX;
    yPos = evt.layerY;

    switch (mode) {
        case 'draw':
            //TODO: rework the resetings (and mode changes)
            editingElement = null;
            resizer.hide();
            drawPolygon();
        break;
        case 'edit':
            finishEdittingElement(SVG.get(evt.target.id));
        break;
    }
}

function down(evt){
    mode = document.querySelector('.mode:checked').id;
    xPos = evt.layerX;
    yPos = evt.layerY;

    switch (mode) {
        case 'edit':
            startEdittingElement(SVG.get(evt.target.id));
        break;
    }
}

function move(evt){
    mode = document.querySelector('.mode:checked').id;
    xPos = evt.layerX;
    yPos = evt.layerY;

    switch (mode) {
        case 'edit':
            editObject(evt.target.id, xPos, yPos);
        break;
    }
}
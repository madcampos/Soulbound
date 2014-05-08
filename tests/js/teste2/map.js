/*global SVG, exports:true*/

var map = SVG('map').fill('transparent'),
	squareGrid = map.pattern(40, 40, function(add){
		add.path('M0,0L0,40').stroke({'color': 'black', 'width': 3, 'opacity': 0.4});
		add.path('M0,0L40,0').stroke({'color': 'black', 'width': 3, 'opacity': 0.4});
	}),
	bg = map.rect('100%','100%').style('pointer-events','none').id('background'),
	walls = map.group().id('walls'),
	clutter = map.group().id('clutter'),
	grid = map.rect('100%','100%').fill(squareGrid).style('pointer-events','none').id('grid'),
	chars = map.group().id('characters'),
	fx = map.group().style('pointer-events','none').id('effects'),
	fogOfWar = map.group().id('fogOfWar'),
	generalNotes = map.group().id('notes'),
	gmNotes = map.group().id('gmNotes'),
	resizer = map.group().id('resizer').hide();

resizer.boundRect = resizer.rect(10, 10).stroke({'color': 'black', 'width': 2, 'opacity': 0.6}).attr('stroke-dasharray', 5).style('cursor', 'move').id('boundRect');
resizer.topLeft = resizer.rect(10, 10).fill('aliceblue').stroke({'color': 'black', 'width': 2, 'opacity': 0.6}).style('cursor', 'nwse-resize').attr('rx', 5).id('topLeft');
resizer.left = resizer.rect(10, 10).fill('aliceblue').stroke({'color': 'black', 'width': 2, 'opacity': 0.6}).style('cursor', 'ew-resize').attr('rx', 5).id('left');
resizer.bottomLeft = resizer.rect(10, 10).fill('aliceblue').stroke({'color': 'black', 'width': 2, 'opacity': 0.6}).style('cursor', 'nesw-resize').attr('rx', 5).id('bottomLeft');
resizer.bottom = resizer.rect(10, 10).fill('aliceblue').stroke({'color': 'black', 'width': 2, 'opacity': 0.6}).style('cursor', 'ns-resize').attr('rx', 5).id('bottom');
resizer.bottomRight = resizer.rect(10, 10).fill('aliceblue').stroke({'color': 'black', 'width': 2, 'opacity': 0.6}).style('cursor', 'nwse-resize').attr('rx', 5).id('bottomRight');
resizer.right = resizer.rect(10, 10).fill('aliceblue').stroke({'color': 'black', 'width': 2, 'opacity': 0.6}).style('cursor', 'ew-resize').attr('rx', 5).id('right');
resizer.topRight = resizer.rect(10, 10).fill('aliceblue').stroke({'color': 'black', 'width': 2, 'opacity': 0.6}).style('cursor', 'nesw-resize').attr('rx', 5).id('topRight');
resizer.rotatorLine = resizer.path('M0,0L0,20', true).stroke({'color': 'black', 'width': 2, 'opacity': 0.6}).id('rotatorLine');
resizer.top = resizer.rect(10, 10).fill('aliceblue').stroke({'color': 'black', 'width': 2, 'opacity': 0.6}).style('cursor', 'ns-resize').attr('rx', 5).id('top');
resizer.rotator = resizer.rect(10, 10).fill('limegreen').stroke({'color': 'black', 'width': 2, 'opacity': 0.6}).style('cursor', 'url(img/rotate.png) 8 8, auto').attr('rx', 5).id('rotator');

function drawResizer(box){
    resizer.boundRect.move(box.x, box.y);
    resizer.boundRect.size(box.width, box.height);

    //cache sizes to avoid calculations
    box.x -= 5;
    box.y -= 5;
    box.halfWidth = box.width / 2 + box.x;
    box.halfHeight = box.height / 2 + box.y;
    box.height += box.y;
    box.width += box.x;

    resizer.topLeft.move(box.x, box.y);
    resizer.left.move(box.x, box.halfHeight);
    resizer.bottomLeft.move(box.x, box.height);
    resizer.bottom.move(box.halfWidth, box.height);
    resizer.bottomRight.move(box.width, box.height);
    resizer.right.move(box.width, box.halfHeight);
    resizer.topRight.move(box.width, box.y);
    resizer.top.move(box.halfWidth, box.y);
    resizer.rotatorLine.move(box.halfWidth + 5, box.y - 10);
    resizer.rotator.move(box.halfWidth, box.y - 20);
    resizer.show();
}

exports = {
    'map': map,
    'background': bg,
    'walls': walls,
    'clutter': clutter,
    'grid': grid,
    'characters': chars,
    'effects': {
        'general': fx,
        'fogOfWar': fogOfWar
    },
    'notes': {
        'general': generalNotes,
        'gm': gmNotes
    },
    'resizer': resizer,
    'drawResizer': drawResizer
};
function selector(cursor, notes, events, walls, _, global, data) {
    //idk
    if (global.params[0] = 'select only') {
        var whatDo = 1
    } else if (global.params[0] = 'deselect all') {
        var whatDo = 2
    };
    var redN = global.params[3];
    var blueN = global.params[4];
    var doWalls = global.params[5];
    var height = global.params[6];
    var doBombs = global.params[7];
    //weird part
    if (global.params[1].length > 0) var property = global.params[1];
    if (global.params[2].length > 0) var propertyValue = global.params[2];

        //Caeden's function
    function safeSetSelectedState(obj, selected) {
        if (obj.selected != selected || selected) {
            obj._time = obj._time;
            obj.selected = selected;
        }
    }

    //select only (notes&walls):
    if (whatDo == 1) {
        for (note of notes) {
            if (note.selected) {
                let shouldSelect = true;
                if (redN != true && note._type == 0) {
                    shouldSelect = false;
                }
                if (blueN != true && note._type == 1) {
                    shouldSelect = false;
                }
                if (property && note[property] != propertyValue) {
                    shouldSelect = false;
                }
                if (doBombs != true && note._type == 3) {
                    shouldSelect = false;
                }
                safeSetSelectedState(note,shouldSelect);
            }
        };
        for (wall of walls) {
            if (wall.selected && doWalls) {
                let shouldSelect = true
                if (height != 2 && wall._type == 1) {
                    shouldSelect = false;
                }
                if (height != 3 && wall._type == 0) {
                    shouldSelect = false;
                }
                safeSetSelectedState(wall,shouldSelect)
            }
        }
    };
}

module.exports = {
    name: "Selection Filter",
    errorCheck: false,
    params: {
        '': [
            'select only:',
            'deselect all:',
        ],
        'property': "",
        'value': "",
        'red notes': false,
        'blue notes': false,
        'walls': false,
        'wall height': [
            '2',
            '3'
        ],
        'bombs': false,
    },
    run: selector
}
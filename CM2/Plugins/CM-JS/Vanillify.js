function vanillify(cursor, notes, events, walls, _, global, data) {

for(let i = 0; i < events.length; i++) {
    if(events[i].selected) {
        selectedEvents.push(events[i])
    };
};

for(let i = 0; i < notes.length; i++) {
    if(notes[i].selected) {
        selectedNotes.push(notes[i])
    };
};

for(let i = 0; i < walls.length; i++) {
    if(walls[i].selected) {
        selectedWalls.push(walls[i])
    };
};

var affectedNotes = 0;
var affectedBombs = 0;
var affectedEvents = 0;
var affectedWalls = 0;

for(x of selectedNotes) {
    let note = notes[x];
    delete note._customData;
    if(note._type == 3) {
        affectedBombs++;
    } else {
        affectedNotes++;
    }
};
for(x of selectedWalls) {
    let wall = selectedWalls[x];
    delete wall._customData;
    affectedWalls++;
};
for(x of selectedEvents) {
    let event = selectedEvents[x];
    delete event._customData;
    affectedEvents++
};

if((affectedNotes.length || affectedEvents.length || affectedWalls.length || affectedBombs.length) > 0) {
    alert(
        `removed the customData of
        ${affectedEvents} events,
        ${affectedNotes} notes,
        ${affectedBombs} bombs,
        and ${affectedWalls} walls. `
)
};
}

module.exports = {
    name: "Vanillifier",
    errorCheck: false,
    run: vanillify
}
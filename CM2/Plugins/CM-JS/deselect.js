function deselect(cursor, notes, events, walls, _, global, data) {
    var offs = global.params[0];
    var reds = global.params[1];
    var blues = global.params[2];
    var ons = global.params[3];
    var flashes = global.params[4];
    var fades = global.params[5];

    alert(`offs:
${offs}, reds: ${reds}
${cursor}
`)

    for (let x = 0; x < events.length; x++) {
        if (events[x].selected) {
            if (offs === true && events[x]._value == 0) {
                events[x].selected = true;
            };
            if (reds === true && ons && events[x]._value == 5) {
                events[x].selected = false;
            };
            if (reds === true && flashes && events[x]._value == 6) {
                events[x].selected = false;
            };
            if (reds === true && fades && events[x]._value == 7) {
                events[x].selected = false;
            };
            if (blues === true && ons && events[x]._value == 1) {
                events[x].selected = false;
            };
            if (blues === true && flashes && events[x]._value == 2) {
                events[x].selected = false;
            };
            if (blues === true && fades && events[x]._value == 3) {
                events[x].selected = false;
            };
        }
    }


}
module.exports = {
    name: "Deselect By Event Type",
    errorCheck: false,
    params: {
        'offs': false,
        'reds': false,
        'blues': false,
        'ons': false,
        'flashes': false,
        'fades': false
    },
    run: deselect
}
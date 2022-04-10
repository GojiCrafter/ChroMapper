function antiyeet(cursor, notes, events, walls, _, global, data) {
    notes = notes.filter((note) => {
        return note._type == 3;
    });

    return {notes: notes};
}

module.exports = {
    name: 'Anti Bomb Yeeter',
    params: {},
    run: antiyeet
};

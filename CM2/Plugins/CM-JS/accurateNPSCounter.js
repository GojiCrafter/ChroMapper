function nps(cursor, notes, events, walls, _, global, data) {
    songM = global.params[0];
    songS = global.params[1];
    songLength = (60*songM) + songS
    realnotes = notes.filter((note) => {
        return note._type !==3;
    });
    realNPS = realnotes.length / songLength;
    realNPS = Math.round((realNPS + Number.EPSILON) * 100) / 100;
    addError(notes[0], `Song's NPS is ${realNPS}.`)
}
module.exports ={
    name: 'Accurate NPS',
    params: {
        'Song Mins': 0,
        'Seconds+MS': 0,
    },
    run: nps,
};
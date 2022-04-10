const { toRealTime } = require("./_kivalCore.js");
const kvlCore = require("./_kivalCore.js");

function check(cursor, notes, events, walls, _, global, data) {
  const lastNote = {
    0: null,
    1: null,
    3: null,
  };
  const lastNotePause = {
    0: null,
    1: null,
    3: null,
  };
  const maybePause = {
    0: false,
    1: false,
    3: false,
  };
  const swingNoteArray = {
    0: [],
    1: [],
    3: [],
  };
  for (let i = 0, len = notes.length; i < len; i++) {
    const note = notes[i];
    if (kvlCore.isNote(note) && lastNote[note._type]) {
      if (
        kvlCore.swingNext(
          note,
          lastNote[note._type],
          data.songBPM,
          swingNoteArray[note._type]
        )
      ) {
        if (
          kvlCore.isBelowThres(
            note._time - lastNote[note._type]._time,
            kvlCore.toRealTime(1 / (global.params[0] / 2), data.songBPM) + 0.01,
            data.songBPM
          )
        ) {
          if (
            maybePause[0] &&
            maybePause[1] &&
            kvlCore.isBelowThres(
              lastNote[note._type]._time - lastNotePause[note._type]._time,
              kvlCore.toRealTime(1 / (global.params[0] / 3), data.songBPM) +
                0.01,
              data.songBPM
            )
          ) {
            addError(lastNote[note._type], "");
          }
          maybePause[note._type] = false;
        } else if (!maybePause[note._type]) {
          maybePause[note._type] = true;
          lastNotePause[note._type] = lastNote[note._type];
        }
        swingNoteArray[note._type] = [];
        lastNote[note._type] = note;
      }
    } else {
      lastNote[note._type] = note;
    }
    swingNoteArray[note._type].push(note);
  }
}

module.exports = {
  name: "Speed Pause (EXPERIMENTAL)",
  params: { "Stream Prec.": 1 / kvlCore.toolValue.maxSpeedPause },
  run: check,
};

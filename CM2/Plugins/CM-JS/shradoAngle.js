const kvlCore = require("./_kivalCore.js");

function check(cursor, notes, events, walls, _, global, data) {
  const lastNote = {
    0: null,
    1: null,
    3: null,
  };
  const lastNoteDirection = {
    0: null,
    1: null,
    3: null,
  };
  const startNoteDot = {
    0: null,
    1: null,
    3: null,
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
        if (startNoteDot[note._type]) {
          startNoteDot[note._type] = null;
          lastNoteDirection[note._type] =
            kvlCore.flipCutDir[lastNoteDirection[note._type]];
        }
        if (
          checkShrAngle(
            note._cutDirection,
            lastNoteDirection[note._type],
            note._type
          ) &&
          kvlCore.isBelowThres(
            note._time - lastNote[note._type]._time,
            kvlCore.toRealTime(global.params[0], data.songBPM) + 0.01,
            data.songBPM
          )
        ) {
          addError(note, "");
        }
        if (note._cutDirection === 8) {
          startNoteDot[note._type] = note;
        } else {
          lastNoteDirection[note._type] = note._cutDirection;
        }
        swingNoteArray[note._type] = [];
      } else {
        if (
          startNoteDot[note._type] &&
          checkShrAngle(
            note._cutDirection,
            lastNoteDirection[note._type],
            note._type
          ) &&
          kvlCore.isBelowThres(
            note._time - lastNote[note._type]._time,
            kvlCore.toRealTime(global.params[0], data.songBPM) + 0.01,
            data.songBPM
          )
        ) {
          addError(note, "Ambiguous dot flow assume Shrado Angle");
          startNoteDot[note._type] = null;
        }
        if (note._cutDirection !== 8) {
          lastNoteDirection[note._type] = note._cutDirection;
        }
      }
    } else {
      lastNoteDirection[note._type] = note._cutDirection;
    }
    lastNote[note._type] = note;
    swingNoteArray[note._type].push(note);
  }
}
function checkShrAngle(n1cd, n2cd, ntype) {
  if (n1cd === 8 || n2cd === 8) {
    return false;
  }
  if ((ntype === 0 ? n2cd === 7 : n2cd === 6) && n1cd === 0) {
    return true;
  }
  return false;
}

module.exports = {
  name: "Shrado Angle",
  params: {
    "Max Time": kvlCore.toolValue.maxShrAngle,
  },
  run: check,
};

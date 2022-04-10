// release v1
// i kinda just copypasted stuff from my check to here
// you are allowed to use and modify stuff i've created
// for feedback, contact me on Discord@Kival Evan#5480

const toolValue = {
  // effective bpm
  ebpm: {
    th: 450,
    thSwing: 350,
  },

  // misc
  minSliderSpeed: 0.025,
  maxShrAngle: 0.5,
  maxSpeedPause: 0.25,
  maxInlineAngle: 0.25,

  // part where no one can control... yet
  // this is way less than i expected
  windowSnapTolerance: 0.00001,
  stack: {
    note: 0.01,
    bomb: 0.02,
  },
  swing: {
    maxHitTol: 0.005,
    maxTol: 0.07,
    maxWindowTol: 0.08,
  },
  hitbox: {
    staircase: 0.15,
  },
  obstacle: {
    minDur: 0.015,
    recovery: 0.1,
  },
};

function isNote(note) {
  return note._type === 0 || note._type === 1;
}

function toRealTime(beat, bpm) {
  return (beat / bpm) * 60;
}
function toBeatTime(num, bpm) {
  return (num * bpm) / 60;
}

function isAboveThres(t, rt, bpm) {
  return toRealTime(t, bpm) > rt;
}
function isBelowThres(t, rt, bpm) {
  return toRealTime(t, bpm) < rt;
}

// Thanks Qwasyx#3000 for improved swing detection
function swingNext(n1, n2, bpm, context = null) {
  if (
    context &&
    context.length > 0 &&
    toRealTime(n2._time, bpm) + toolValue.swing.maxHitTol <
      toRealTime(n1._time, bpm) &&
    n1._cutDirection !== 8
  ) {
    for (const n of context) {
      if (
        n._cutDirection !== 8 &&
        checkAngle(n1._cutDirection, n._cutDirection, 90, true)
      ) {
        return true;
      }
    }
  }
  if (context && context.length > 0) {
    for (const other of context) {
      if (
        Math.max(
          Math.abs(other._lineIndex - n1._lineIndex),
          Math.abs(other._lineLayer - n1._lineLayer)
        ) < 1
      ) {
        return true;
      }
    }
  }
  return (
    (swingWindow(n1, n2) &&
      isAboveThres(n1._time - n2._time, toolValue.swing.maxWindowTol, bpm)) ||
    isAboveThres(n1._time - n2._time, toolValue.swing.maxTol, bpm)
  );
}

function swingHorizontal(n1, n2) {
  return Math.abs(n1._lineLayer - n2._lineLayer) === 0;
}

function swingVertical(n1, n2) {
  return Math.abs(n1._lineIndex - n2._lineIndex) === 0;
}

function swingDiagonal(n1, n2) {
  return (
    Math.abs(n1._lineIndex - n2._lineIndex) ===
    Math.abs(n1._lineLayer - n2._lineLayer)
  );
}

function swingNoteEnd(n1, n2, cutDir = 8) {
  // fuck u and ur dot note stack
  if (n1._cutDirection === 8 && n2._cutDirection === 8 && cutDir !== 8) {
    // if end note on right side
    if (n1._lineIndex > n2._lineIndex) {
      if (cutDir === 5 || cutDir === 3 || cutDir === 7) {
        return true;
      }
    }
    // if end note on left side
    if (n1._lineIndex < n2._lineIndex) {
      if (cutDir === 6 || cutDir === 2 || cutDir === 4) {
        return true;
      }
    }
    // if end note is above
    if (n1._lineLayer > n2._lineLayer) {
      if (cutDir === 4 || cutDir === 0 || cutDir === 5) {
        return true;
      }
    }
    // if end note is below
    if (n1._lineLayer < n2._lineLayer) {
      if (cutDir === 6 || cutDir === 1 || cutDir === 7) {
        return true;
      }
    }
  }
  // if end note on right side
  if (n1._lineIndex > n2._lineIndex) {
    // check if end note is arrowed
    if (
      n1._cutDirection === 5 ||
      n1._cutDirection === 3 ||
      n1._cutDirection === 7
    ) {
      return true;
    }
    // check if end note is dot and start arrow is pointing to it
    if (
      (n2._cutDirection === 5 ||
        n2._cutDirection === 3 ||
        n2._cutDirection === 7) &&
      n1._cutDirection === 8
    ) {
      return true;
    }
  }
  // if end note on left side
  if (n1._lineIndex < n2._lineIndex) {
    if (
      n1._cutDirection === 6 ||
      n1._cutDirection === 2 ||
      n1._cutDirection === 4
    ) {
      return true;
    }
    if (
      (n2._cutDirection === 6 ||
        n2._cutDirection === 2 ||
        n2._cutDirection === 4) &&
      n1._cutDirection === 8
    ) {
      return true;
    }
  }
  // if end note is above
  if (n1._lineLayer > n2._lineLayer) {
    if (
      n1._cutDirection === 4 ||
      n1._cutDirection === 0 ||
      n1._cutDirection === 5
    ) {
      return true;
    }
    if (
      (n2._cutDirection === 4 ||
        n2._cutDirection === 0 ||
        n2._cutDirection === 5) &&
      n1._cutDirection === 8
    ) {
      return true;
    }
  }
  // if end note is below
  if (n1._lineLayer < n2._lineLayer) {
    if (
      n1._cutDirection === 6 ||
      n1._cutDirection === 1 ||
      n1._cutDirection === 7
    ) {
      return true;
    }
    if (
      (n2._cutDirection === 6 ||
        n2._cutDirection === 1 ||
        n2._cutDirection === 7) &&
      n1._cutDirection === 8
    ) {
      return true;
    }
  }
  return false;
}

function swingWindow(n1, n2) {
  return (
    Math.max(
      Math.abs(n1._lineIndex - n2._lineIndex),
      Math.abs(n1._lineLayer - n2._lineLayer)
    ) >= 2
  );
}

function swingNoteDouble(n1, notes, index) {
  for (let i = index, len = notes.length; i < len; i++) {
    if (notes[i]._time < n1._time + 0.01 && notes[i]._type !== n1._type) {
      return true;
    }
    if (notes[i]._time > n1._time + 0.01) {
      return false;
    }
  }
}

// thanks Top_Cat#1961
function mod(x, m) {
  if (m < 0) {
    m = -m;
  }
  let r = x % m;
  return r < 0 ? r + m : r;
}
function shortRotDistance(a, b, m) {
  return Math.min(mod(a - b, m), mod(b - a, m));
}

function checkAngle(n1cd, n2cd, angle, invert = false) {
  if (n1cd === 8 || n2cd === 8) {
    return false;
  }
  if (
    !invert
      ? shortRotDistance(noteCutAngle[n1cd], noteCutAngle[n2cd], 360) <= angle
      : shortRotDistance(noteCutAngle[n1cd], noteCutAngle[n2cd], 360) >= angle
  ) {
    return true;
  }
  return false;
}

function round(num, d = 0) {
  const place = Math.pow(10, d);
  return Math.round(num * place) / place;
}

function testFunction(data) {
  alert(
    "Core script module for various use\nand development purpose.\n\nRelease version 1.0.0"
  );
}

const noteCutAngle = [
  0, // 0
  180, // 1
  270, // 2
  90, // 3
  315, // 4
  45, // 5
  225, // 6
  135, // 7
  0, // 8
];

const flipCutDir = [
  1, // 0
  0, // 1
  3, // 2
  2, // 3
  7, // 4
  6, // 5
  5, // 6
  4, // 7
  8, // 8
];

const swingCutDirectionSpace = {
  0: [0, 1],
  1: [0, -1],
  2: [-1, 0],
  3: [1, 0],
  4: [-1, 1],
  5: [1, 1],
  6: [-1, -1],
  7: [1, -1],
  8: [0, 0],
};

module.exports = {
  isNote,
  toRealTime,
  toBeatTime,
  isAboveThres,
  isBelowThres,
  swingNext,
  swingHorizontal,
  swingVertical,
  swingDiagonal,
  swingNoteEnd,
  swingWindow,
  swingNoteDouble,
  checkAngle,
  round,
  toolValue,
  noteCutAngle,
  flipCutDir,
  swingCutDirectionSpace,
  name: "KivalCore",
  run: testFunction,
};

function performCheck(cursor, notes, events, walls, _, global, data) {
 const interval = global.params[0];
 const amount = global.params[1];
 const startid = global.params[2];
 const loops = global.params[3];
 const startR = global.params[4];
 const startB = global.params[5];
 const startG = global.params[6];
 const startA = global.params[7];
 const endR = global.params[8];
 const endB = global.params[9];
 const endG = global.params[10];
 const endA = global.params[11];
 var count = 0;
 var mx = 4;
 for (let xz = 0; xz < loops; xz++) {
  if (xz % 2) {
   sR = endR;
   sB = endB;
   sG = endG;
   sA = endA;
   eR = startR;
   eB = startB;
   eG = startG;
   eA = startA;
  } else {
   sR = startR;
   sB = startB;
   sG = startG;
   sA = startA;
   eR = endR;
   eB = endB;
   eG = endG;
   eA = endA;
  }
  var gap = 1 / interval;

  var count2 = 0;
  var countid = 0;
  var total = amount;

  for (let i = 0; i <= amount - 1; i++) {
   var startid2 = [startid + countid * mx, startid + 1 + countid * mx, startid + 2 + countid * mx, startid + 3 + countid * mx];
   var r1 = sR / total;
   var g1 = sG / total;
   var b1 = sB / total;
   var a1 = sA / total;
   var r2 = eR / total;
   var g2 = eG / total;
   var b2 = eB / total;
   var a2 = eA / total;
   var currentColor = [sR - r1 * count2 + r2 * count2, sG - g1 * count2 + g2 * count2, sB - b1 * count2 + b2 * count2, sA - a1 * count2 + a2 * count2];

   events.push(
    {
     _time: cursor + gap * count,
     _type: 1,
     _value: 1,
     _customData: {
      _color: currentColor,
      _lightID: startid2
     }
    },
    {
     _time: cursor + 0.025 + gap * count,
     _type: 1,
     _value: 0,
     _customData: {
      _lightID: startid2
     }
    }
   );
   count++;
   count2++;
   countid++;
  }
  for (let a = 0; a <= amount - 1; a++) {
   countid--;
   var startid2 = [startid + countid * mx, startid + 1 + countid * mx, startid + 2 + countid * mx, startid + 3 + countid * mx];
   events.push(
    {
     _time: cursor + gap * count,
     _type: 1,
     _value: 5,
     _customData: {
      _color: currentColor,
      _lightID: startid2
     }
    },
    {
     _time: cursor + 0.025 + gap * count,
     _type: 1,
     _value: 0,
     _customData: {
      _lightID: startid2
     }
    }
   );
   count++;
   count2++;
  }
 }
}

module.exports = {
 name: "Ring Propwave Generator v0.01",
 params: { Precision: 1, Width: 1, startID: 1, Loops: 2, "Start R": 1, "Start B": 0, "Start G": 0, "Start A": 1, "End R": 1, "End B": 0, "End G": 0, "End A": 1 },
 run: performCheck
};

function performCheck(cursor, notes, events, walls, _, global, data) {
	
	const blueOn = 1;
	const blues = [1, 2, 3];

	const redOn = 5;
	const reds = [5, 6, 7];

	// I prefer black. Doesn't really matter what color's here as long as alpha is 0.
	const invisibleColor = [0, 0, 0, 0];
	
	// Offs
	let lastType0 = 0;
	let lastType1 = 0;
	let lastType2 = 0;
	let lastType3 = 0;
	let lastType4 = 0;
	
	function changeColorOn(thing, onValue) {
		thing._value = onValue;
		thing._customData._color = invisibleColor;
	}
	
	for (x in events) {
		thing = events[x];

		// Holy shit. This is absolutely scuffed.
		if (thing._customData != null) { 
			if (thing._customData._lightID) {
				if (thing._value == 0) {
					console.log(thing._time, "asdf")
					// Get value of last type and change if needed
					switch(thing._type) {
						case 0:
							if (blues.includes(lastType0)) {
								changeColorOn(thing, blueOn);
							} else if (reds.includes(lastType0)) {
								changeColorOn(thing, redOn);
							}
							break;
						case 1:
							if (blues.includes(lastType1)) {
								changeColorOn(thing, blueOn);
							} else if (reds.includes(lastType1)) {
								changeColorOn(thing, redOn);
							}
							break;
						case 2:
							if (blues.includes(lastType2)) {
								changeColorOn(thing, blueOn);
							} else if (reds.includes(lastType2)) {
								changeColorOn(thing, redOn);
							}
							break;
						case 3:
							if (blues.includes(lastType3)) {
								changeColorOn(thing, blueOn);
							} else if (reds.includes(lastType3)) {
								changeColorOn(thing, redOn);
							}
							break;
						case 4:
							if (blues.includes(lastType4)) {
								changeColorOn(thing, blueOn);
							} else if (reds.includes(lastType4)) {
								changeColorOn(thing, redOn);
							}
							break;
					}
				}
			}
		}

		// Remember value of last type
		switch (thing._type) {
			case 0:
				lastType0 = thing._value;
				break;
			case 1:
				lastType1 = thing._value;
				break;
			case 2:
				lastType2 = thing._value;
				break;
			case 3:
				lastType3 = thing._value;
				break;
			case 4:
				lastType4 = thing._value;
				break;
		}
	}
}

module.exports = {
	name: "Turn lightID Offs to Ons",
	params: {},
	run: performCheck
};
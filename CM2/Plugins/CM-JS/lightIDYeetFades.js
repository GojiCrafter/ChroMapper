function performCheck(cursor, notes, events, walls, _, global, data) {
	
	const blueOn = 1;
	const blueNotOn = [2, 3];

	const redOn = 5;
	const redNotOn = [6, 7];
	
	for (x in events) {
		thing = events[x];
		
		// Has lightID
		if (thing._customData != null) { 
			if (thing._customData._lightID != null) {

				if (blueNotOn.includes(thing._value)) {
					thing._value = blueOn;

				} else if (redNotOn.includes(thing._value)) {
					thing._value = redOn;
				}
			}
		}
	}
}

module.exports = {
	name: "Yeet lightID Fades/Flashes",
	params: {},
	run: performCheck
};
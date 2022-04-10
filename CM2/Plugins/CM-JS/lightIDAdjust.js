function performCheck(cursor, notes, events, walls, _, global, data) {
	const mult = global.params[0];
	const minTime = global.params[1];
	const maxTime = global.params[2];
	const lightType = global.params[3];

	const validLights = [0, 1, 2, 3, 4];

	const allLightsFlag = !validLights.includes(lightType);
	
	for (x in events) {
		thing = events[x];

		// Time
		if (thing._time >= minTime && thing._time <= maxTime) {

			// Has color
			if (thing._customData != null) {
				if (thing._customData._lightID != null && thing._customData._color != null) {

					// Which type if needed
					if (allLightsFlag || thing._type == lightType) {
						colors = thing._customData._color;
						colors[0] *= mult; // R
						colors[1] *= mult; // G
						colors[2] *= mult; // B
					}
				}
			}
		}
	}
}

module.exports = {
	name: "Adjust lightID Colours",
	params: {"Multiplier": 1.00, "MinTime":0, "MaxTime":9999, "EventType":-1},
	run: performCheck
};
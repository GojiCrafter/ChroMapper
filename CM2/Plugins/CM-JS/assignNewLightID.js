//The events already need to have lightID for this to work I think
function assignID(cursor, notes, events, walls, _, global, data) {
    newLightID = global.params[0];

    selectedEvents = [];
    for (let i = 0; i < events.length; i++) {
        if (events[i].selected) {
            selectedEvents.push(events[i]);
            events.splice(i,1);
        }
    };
        for (let i = 0; i < selectedEvents.length; i++) {
            let light = selectedEvents[i];
            //if the event has customData
            if (light._customData) {
                //do thing
                light._customData._lightID.push(newLightID);
                events.push(light);
            }
        }
    
}
module.exports = {
    name: "Assign _lightID to events",
    errorCheck: false,
    params:{
     "_lightID": 0},
    run: assignID
}
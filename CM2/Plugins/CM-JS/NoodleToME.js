function toMappingExtensions(cursor, notes){
    // Change note position from Noodle to ME
    for(i in notes){
        if (notes[i]._customData != null){
            var xPos;
            var yPos;
            var rotation;

            rotation = notes[i]._customData._cutDirection
            xPos = notes[i]._customData._position[0];
            yPos = notes[i]._customData._position[1];    

            notes[i]._customData = null;
            
            if (xPos >= -2){
                notes[i]._lineIndex = ((xPos * 1000) + 3000);
            }
            else{
                notes[i]._lineIndex = ((xPos * 1000) + 1000);
            }
            if (yPos >= 0){
                notes[i]._lineLayer = ((yPos * 1000) + 1000);
            } else if (yPos < 0 && yPos > -2) {
                notes[i]._lineLayer = yPos;
            } else{
                notes[i]._lineLayer = ((yPos * 1000) - 1000);
            }
            if(rotation){
                notes[i]._cutDirection = (1360 - rotation)
            }
        }
    }
}

module.exports = {
    name: "Noodle to Mapping Extensions",
    errorCheck: false,
    run: toMappingExtensions
}
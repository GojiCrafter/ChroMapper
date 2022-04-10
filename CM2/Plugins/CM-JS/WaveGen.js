//MAKE SURE YOU ONLY HAVE 1 EVENT TYPE SELECTED AT A TIME OR THIS *WILL* BREAK
function waveGen(cursor, notes, events, walls, _, global, data, selected) {
    //lightIDs
    var lightID = 0;
    var type0 = 0;
    var type1 = 0;
    var type2 = 0;
    var type3 = 0;
    var type4 = 0;
    var type6 = 0;
    var type7 = 0;

    //get selected events
    selectedEvents = [];
    for (let i = 0; i < events.length; i++) {
        if(events[i].selected) {
            selectedEvents.push(events[i])
        };
    };


    environment = global.params[0];
    switch(environment) { //I retract my YandereDev joke
        case 'Default':
            type0 = 10; //back lasers
            type1 = 60; //rings
            type2 = 7; //left lasers
            type3 = 7; //right lasers
            type4 = 12; //center lights
            break;
        case 'Big Mirror':
            type0 = 10;
            type1 = 60;
            type2 = 5;
            type3 = 5;
            type4 = 14;
            break;
        case 'Triangle':
            type0 = 10;
            type1 = 60;
            type2 = 10;
            type3 = 10;
            type4 = 10;
            break;
        case 'Nice':
            type0 = 8;
            type1 = 40;
            type2 = 7;
            type3 = 7;
            type4 = 12;
            break;
        case 'KDA':
            type0 = 6;
            type1 = 5;
            type2 = 7;
            type3 = 9;
            type4 = 80;
            break;
        case 'Monstercat':
            type0 = 8;
            type1 = 7;
            type2 = 5;
            type3 = 5;
            type4 = 14;
            break;
        case 'Dragons':
            type0 = 2;
            type1 = 62;
            type2 = 5;
            type3 = 5;
            type4 = 4;
            break;
        case 'Origins':
            type0 = 4;
            type1 = 60;
            type2 = 6;
            type3 = 6;
            type4 = 2;
            break;
        case 'Crab Rave':
            type0 = 8;
            type1 = 7;
            type2 = 5;
            type3 = 5;
            type4 = 14;
            break;
        case 'Panic!':
            type0 = 2;
            type1 = 62;
            type2 = 7;
            type3 = 7;
            type4 = 4;
            break;
        case 'Rocket League':
            type0 = 11;
            type1 = 4;
            type2 = 7;
            type3 = 7;
            type4 = 5;
            break;
        case 'Green Day':
            type0 = 16;
            type1 = 60;
            type2 = 6;
            type3 = 6;
            type4 = 3;
            break;
        case 'Green Day Grenade':
            type0 = 16; //no rings in this environment? Pepega
            type2 = 6;
            type3 = 6;
            type4 = 3;
            break;
        case 'Timbaland':
            type0 = 20;
            type1 = 20;
            type2 = 10;
            type3 = 14;
            type4 = 6;
            break;
        case 'FitBeat':
            type0 = 30;
            type1 = 30;
            type2 = 8;
            type3 = 8;
            type4 = 2;
            break;
        case 'Linkin Park':
            type0 = 2;
            type1 = 16;
            type2 = 20;
            type3 = 20;
            type4 = 1;
            break;
        case 'BTS':
            type0 = 1;
            type1 = 12;
            type2 = 9;
            type3 = 9;
            type4 = 3;
            break;
        case 'Kaliedescope':
            type0 = 40;
            type1 = 40;
            type2 = 20;
            type3 = 20;
            type4 = 80;
            break;
        case 'Interscope':
            type0 = 3;
            type1 = 3;
            type2 = 3;
            type3 = 3;
            type4 = 6;
            type6 = 7;
            type7 = 7;
            break;
        case 'Skrillex':
            type0 = 2;
            type1 = 66;
            type2 = 23;
            type3 = 23;
            type4 = 66;
            type6 = 24;
            type7 = 24;
            break;
    

};
//this feels super scuffed but honestly IDRC
switch(selectedEvents[0].type) {
    case 0:
        lightID = type0;
        break;
    case 1:
        lightID = type1;
        break;
    case 2:
        lightID = type2;
        break;
    case 3:
        lightID = type3;
        break;
    case 4:
        lightID = type4;
        break;
    case 6:
        lightID = type6;
        break;
    case 7:
        lightID = type7;
        break;
};

if(global.params[1] > global.params[2] && global.params[2] < lightID) {
    start = global.params[1];
    end = global.params[2];
};

var counter = start;

for(let i = start; i < selectedEvents.length; i++){
    if(counter = )
}


}
module.exports = {
    name: 'Equivalent LightID Converter',
    errorCheck: false,
    params: {
        'Environment' : [
            'Default',
            'Big Mirror',
            'Triangle',
            'Nice',
            'KDA',
            'Monstercat',
         'Dragons',
          'Origins',
         'Crab Rave',
         'Panic!',
         'Rocket League',
            'Green Day',
            'Green Day Grenade',
          'Timbaland',
          'FitBeat',
           'Linkin Park',
           'BTS',
          'Kaleidescope',
          'Interscope',
          'Skrillex'
        ],
        'Start ID' : 0,
        'End ID' : 0,
        'Mirror or Repeat?': [
            'Mirror',
            'Repeat'
          ]
    },
    run: waveGen
}
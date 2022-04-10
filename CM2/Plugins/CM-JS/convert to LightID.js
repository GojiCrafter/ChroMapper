function eqID(cursor, notes, events, walls, _, global, data, selected) {
    //lightIDs or something
    var type0 = 0;
    var type1 = 0;
    var type2 = 0;
    var type3 = 0;
    var type4 = 0;
    var type6 = 0;
    var type7 = 0;

    selectedEvents =[];

    environment = global.params[0];

    switch(environment) { //literally better programmer than YandereDev
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
    //get selected events
    for (let i = 0; i < events.length; i++) {
        if(events[i].selected && events[i]._value) {
            selectedEvents.push(events[i])
        };
    };
    //setting up array for looping purposes
    gamerArray = [];

    for (let i = 0; i < selectedEvents.length; i++) {
        var l = selectedEvents[i];
        //skip events that already have a lightID assigned or if they are a gradient or are not chroma already because no
        if(l._customData._lightID || l._customData._lightGradient || !l._customData) {
            continue;
        } else {
            //types
            switch(l._type) {
                case 0:
                    for (let i = 1; i <= type0; i++) {
                        //I have no idea how to do add things to an array in this context so I'm going to just set _lightID to a preexisting array
                        gamerArray.push(i);
                    };
                    l._customData._lightID = gamerArray;
                    gamerArray.length = 0;
                    break;
                case 1:
                    for (let i = 1; i <= type1; i++) {
                        gamerArray.push(i);
                    };
                    l._customData._lightID = gamerArray;
                    gamerArray.length = 0;
                    break;
                case 2:
                    for (let i = 1; i <= type2; i++) {
                        gamerArray.push(i);
                    };
                    l._customData._lightID = gamerArray;
                    gamerArray.length = 0;
                    break;
                case 3:
                    for (let i = 1; i <= type3; i++) {
                        gamerArray.push(i);
                    };
                    l._customData._lightID = gamerArray;
                    gamerArray.length = 0;
                    break;
                case 4:
                    for (let i = 1; i <= type4; i++) {
                        gamerArray.push(i);
                    };
                    l._customData._lightID = gamerArray;
                    gamerArray.length = 0;
                    break;
                //skip 5 because that's boosts for some reason
                case 6:
                    for (let i = 1; i <= type6; i++) {
                        gamerArray.push(i);
                    };
                    l._customData._lightID = gamerArray;
                    gamerArray.length = 0;
                    break;
                case 7:
                    for (let i = 1; i <= type7; i++) {
                        gamerArray.push(i);
                    };
                    l._customData._lightID = gamerArray;
                    gamerArray.length = 0;
                    break;
            };
        }

};
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
        ]
    },
    run: eqID
}
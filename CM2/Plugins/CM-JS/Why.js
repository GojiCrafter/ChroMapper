function whyWouldYouDoThis(cursor, notes, events, walls, _, global, data) {
    for(let i = 0; i < notes.length; i++) {
        if(notes[i].selected) {
            selectedNote.push(notes[i])
        };
    };
if(selectedNote.length !== 1) {
    alert('bruh');
    return;
};
colorNew = selectedNote[0]._customData._color;
for(let i = 0; i < notes.length; i++) {
    if(notes._type == selectedNote[0]._type){
        notes[i]._customData._color = colorNew;
    }
};
}
module.exports = {
    name: "Why would you do this",
    errorCheck: false,
    run: whyWouldYouDoThis
}
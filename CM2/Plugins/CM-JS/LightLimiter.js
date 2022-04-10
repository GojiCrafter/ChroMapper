/*
Made by Swifter1243 :)

HOW TO USE:

Multiply/Limit: Boolean (1/0)

Elements:
0 = RGB
1 = R
2 = G
3 = B
4 = A
5 = Highest RGB Element
6 = Highest RGBA Element

Value: Number to be used in the operation

*/

var shouldMultiply;
var mulElements;
var mulValue;
var shouldLimit;
var limElements;
var limValue;

var selectedLights;
var mulElemsToEdit;
var limElemsToEdit;

function limitLights(cursor, notes, events, walls, _, global, data) {
    shouldMultiply = global.params[0] == 1;
    mulElements = global.params[1];
    mulValue = global.params[2];
    shouldLimit = global.params[3] == 1;
    limElements = global.params[4];
    limValue = global.params[5];

    selectedLights = [];
    mulElemsToEdit = [];
    limElemsToEdit = [];

    for (x of events) {
        if (x.selected) selectedLights.push(x);
    }

    if (selectedLights.length < 1) {
        alert("There are no lights selected!");
        return;
    }

    if (!shouldMultiply && !shouldLimit) {
        alert("There are no operations selected!");
        return;
    }

    if (mulElements == 0) mulElemsToEdit = [0, 1, 2];
    if (mulElements == 1) mulElemsToEdit = [0];
    if (mulElements == 2) mulElemsToEdit = [1];
    if (mulElements == 3) mulElemsToEdit = [2];
    if (mulElements == 4) mulElemsToEdit = [3];

    if (limElements == 0) limElemsToEdit = [0, 1, 2];
    if (limElements == 1) limElemsToEdit = [0];
    if (limElements == 2) limElemsToEdit = [1];
    if (limElements == 3) limElemsToEdit = [2];
    if (limElements == 4) limElemsToEdit = [3];

    if (shouldMultiply) {
        for (i = 0; i < selectedLights.length; i++) {
            var x = selectedLights[i];
            if (x._customData && x._customData._color) selectedLights[i]._customData._color = multiply(x._customData._color);
            if (x._customData && x._customData._lightGradient && x._customData._lightGradient._startColor) selectedLights[i]._customData._lightGradient._startColor = multiply(x._customData._lightGradient._startColor);
            if (x._customData && x._customData._lightGradient && x._customData._lightGradient._endColor) selectedLights[i]._customData._lightGradient._endColor = multiply(x._customData._lightGradient._endColor);
        }
    }

    if (shouldLimit) {
        for (x of selectedLights) {
            if (x._customData && x._customData._color) x._customData._color = limit(x._customData._color);
            if (x._customData && x._customData._lightGradient && x._customData._lightGradient._startColor) x._customData._lightGradient._startColor = limit(x._customData._lightGradient._startColor);
            if (x._customData && x._customData._lightGradient && x._customData._lightGradient._endColor) x._customData._lightGradient._endColor = limit(x._customData._lightGradient._endColor);
        }
    }
}

function findMaxIndex(input) {
    var max = 0;
    var index = 0;
    
    for (x = 0; x < getLength(input); x++) {
        if (input[x] > max) {
            max = input[x];
            index = x;
        }
    }
    return index;
}

function getLength(input) {
    var length = 0;
    var num = 0;

    while (num < 69 /* I don't feel safe putting "true", so max is 69 tries incase something breaks lmao */) {
        if (input[length] == "null" || input[length] == null) num = 69;
        else length++;
        num++;
    }

    return length - 1;
}

function multiply(input) {
    if (mulElements == 5) {
        input[3] = 0;
        mulElemsToEdit = [findMaxIndex(input)];
    }
    if (mulElements == 6) mulElemsToEdit = [findMaxIndex(input)];

    for (x of mulElemsToEdit) {
        element = input[x];
        element *= mulValue;
        input[x] = element;
    }

    return input;
}

function limit(input) {
    if (limElements == 5) {
        input[3] = 0;
        limElemsToEdit = [findMaxIndex(input)];
    }
    if (limElements == 6) limElemsToEdit = [findMaxIndex(input)];

    var multiplyToLimit = limValue / input[findMaxIndex(input)];
    for (x of limElemsToEdit) {
        element = input[x];
        element *= multiplyToLimit;
        input[x] = element;
    }

    return input;
}

module.exports = {
    name: "Light Limiter",
    params: { "Multiply": 0, "Elements": 0, "Value": 0, "Limit": 0, "Elements ": 0, "Value ": 0 },
    run: limitLights
};
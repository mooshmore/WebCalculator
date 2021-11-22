function getPositionsLastValue(positionString) { // [60][2][5][5] --> 5
    const lastBracket = positionString.lastIndexOf('[');
    lastValue = positionString.substr(lastBracket + 1);
    lastValue = parseInt(lastValue);
    return lastValue;
}

function enterVertically(positionString) { // [60][2][5][5] --> [60][2][5][4][1]
    positionString = goSideways(-1, positionString);
    positionString = `${positionString}][1`;
    return positionString;
}

function goSideways(direction, positionString) { // [60][2][5][5] --> [60][2][5][7] or [60][2][5][5] --> [60][2][5][3]
    lastValue = getPositionsLastValue(positionString);
    positionString = positionString.substr(0, positionString.lastIndexOf('['));
    lastValue += direction;
    positionString += `[${lastValue}`;
    return positionString;
}

function deleteLastLevel(positionString) { //[60][2][5][5] --> [60][2][5]
    positionString = positionString.substr(0, positionString.lastIndexOf('[') - 1);
    getPositionsLastValue(positionString);
    positionString = positionString.substr(0, positionString.lastIndexOf('[') - 1);
    positionString += `][${lastValue}`;
    return positionString;
}

function getLength(positionString, arrayName){
    positionString = deleteLastLevel(positionString);
    const checkArray = eval(`${arrayName}[${positionString}]`);
    return checkArray.length;
}

let searchedIndex = -1;
let notHere = false;
let foundPosition;

function findPosition(id, searchedPosition) { // Returns position of a searched item, takes searchedPosition to start searching at a specific position/depth
    event.stopPropagation(); // Only work on the deepest nested div, not the parent elements!

    if (searchedIndex == -1) { // Skip if the result already has been found
        do {
            let tempTable = eval(`positionRoutes[${searchedPosition}].slice(0)`); // Temporary table is neeeded because some js functions don't work on multi - dimension arrays.
            if (tempTable.includes(id)) {
                searchedIndex = tempTable.indexOf(id);
                searchedPosition += `][${searchedIndex}`
                foundPosition = searchedPosition;
            } else {
                for (let i = 0; i < tempTable.length; i++) { // Check every element of array
                    if (typeof (tempTable[i]) == 'object' && tempTable[i].length > 0) { // If element is an array and it isn't empty search through it
                        findPosition(id, `${searchedPosition}][${i}`);
                        if (searchedIndex !== -1) {
                            break;
                        }
                    }
                    if (tempTable.length - 1 == i) {
                        notHere = true;
                    }
                }
            }
            if (searchedIndex !== -1) {
                break;
            }
        } while (searchedIndex == -1 && !notHere);
    }
    return foundPosition;
}
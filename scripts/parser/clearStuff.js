let croppedExpression;

function clearEvents() {
    const nodes = document.getElementsByClassName('operation')[0].childNodes;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'span') {
            nodes[i].removeAttribute(onclick);
            nodes[i].removeAttribute(onmouseover);
            nodes[i].removeAttribute(onmouseout);
        }
    }
}

function clearStuff() {
    croppedExpression = wholeExpression;
    croppedExpression = croppedExpression.replace(/ special/g, "");
    croppedExpression = croppedExpression.replace(/ cursor/g, "");

    clearBrackets();
    clearBars();
    
    let stringTable = [];
    stringTable[0] = [`id=`, `"`, 1, 2, 1];
    stringTable[1] = [`style="`, `"`, 1, 7, 1];
    stringTable[2] = [`<sup`, `>`, 0, 0, 1];
    stringTable[3] = [`<sub`, `>`, 0, 0, 1];
    stringTable[4] = [`onclick="`, `"`, 1, 9, 1];
    stringTable[5] = [`onmouseover="`, `"`, 1, 13, 1];
    stringTable[6] = [`onmouseout="`, `"`, 1, 12, 1];

    for (let i = 0; i < stringTable.length; i++) {
        if (croppedExpression.includes(stringTable[i][0])) {
            clearCharacters(stringTable[i][0], stringTable[i][1], stringTable[i][2], stringTable[i][3], stringTable[i][4]);
        }
    }

    croppedExpression = croppedExpression.replace(/<span class="whitespace"><\/span>/g, "");

    // Having signs like < and / in a regex makes bugs, so a special
    // function is needed to delete them without problems.
    
    let substrings = [];
    substrings[0] = [`</sub>`, `</sup>`, `√`, `°`, `!`, `,`, ''];
    substrings[1] = [`log<`, `sin<`, `cos<`, `tan<`, `rand<`, `<`, ];

    clearSimpleSubstrings(substrings[0]);
    clearSimpleSubstrings(substrings[1]);

    croppedExpression = croppedExpression.replace(/ +(?= )/g, ''); // Replace multiple spaces with one
    croppedExpression = croppedExpression.replace(/π/g, "3.1415926535897932");

    return croppedExpression;
}

function clearCharacters(beginning, end, forwardRange, backwardsRange,  backwardsRange2) {
    do {
        const charStart = croppedExpression.indexOf(beginning);
        const croppedFrontExpression = croppedExpression.substr(0, charStart - forwardRange);
        let croppedBackExpression = croppedExpression.substr(charStart + backwardsRange);
        croppedBackExpression = croppedBackExpression.substr(2);
        const charEnd = croppedBackExpression.indexOf(end);
        croppedBackExpression = croppedBackExpression.substr(charEnd + backwardsRange2);
        croppedExpression = croppedFrontExpression + croppedBackExpression;
    } while (croppedExpression.indexOf(beginning) !== -1);
    return croppedExpression;
}

// Having signs like < and / in a regex makes bugs, so a special
// function is needed to delete them without problems.

function clearSimpleSubstrings(substrings) {
    for (let i = 0; i < substrings.length - 1; i++) {
        if (croppedExpression.includes(substrings[i])) {
            croppedExpression = croppedExpression.replace(new RegExp(substrings[i], 'g'), substrings[substrings.length - 1]);
        }
    }
}

function clearBrackets() { // Removes brackets from string
    if (croppedExpression.includes('(') || croppedExpression.includes(')')) {
        croppedExpression = croppedExpression.replace(/[{()}]/g, '');
    }
}

function clearBars() { // Remove bars from strings
    if (croppedExpression.includes('|')) {
        croppedExpression = croppedExpression.replace(/[{|}]/g, '');
    }
}



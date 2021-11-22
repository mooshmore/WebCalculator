let wholeExpression;
let expression = [];
let index = 0;
let toCheck = [];

function parser() {
    expression = [];
    index = 0;
    toCheck = [];
    wholeExpression = document.getElementById('1').innerHTML;
    wholeExpression = wholeExpression.trim();

    wholeExpression = clearStuff();
    
    parseIntoTables( wholeExpression, '');
    result = undefined;
    resultDepth = undefined;
    calculate(expression);
}




function parseIntoTables(parsedExpression, position) {
    do {
        let type = parsedExpression.substr(13, 3); 
        let cutExpression = parsedExpression.substr(0,findClosingSpan(parsedExpression));
        if ((type == 'y">') || (type == 'x">')){
            if (type == 'y">') {
                type = 'y';
            } else {
                type = 'x';
            }
            cutExpression = cutExpression.substr(16);
        } else {
            cutExpression = cutExpression.substr(18);
        }
        parsedExpression = parsedExpression.substr(cutExpression.length + 25);
        assignToExpression( cutExpression, position, type);
        index++;   
    } while (parsedExpression.length > 0);

    do {
        if (eval(`expression${toCheck[0]}.includes('span')`)) {
            let tempCheck = toCheck[0];
            toCheck.splice(0, 1);
            eval(`parseIntoTables( expression${tempCheck}, tempCheck)`);
        } else {
            toCheck.splice(0, 1);
        }
    } while ( toCheck.length > 0 );
}

function assignToExpression( insertedValue, position, type) {
    let assignIndex;
    if ( position == '' ) {
        assignIndex = `[${index}]`;
    } else {
        assignIndex = '';
    }
    
    eval(`expression${position}${assignIndex} = []`);
    eval(`expression${position}${assignIndex}[0] = 'calculate'`);
    eval(`expression${position}${assignIndex}[1] = type`);
    let cutAssignedExpression;
    let expressionCounter = 2;
    
    do {
        if ( insertedValue.includes('span')) {
            cutAssignedExpression = insertedValue.substr(0, findClosingSpan(insertedValue) + 7);
        } else {
            cutAssignedExpression = insertedValue;
        }
        eval(`expression${position}${assignIndex}[${expressionCounter}] = cutAssignedExpression`);
        toCheck.push(`${position}${assignIndex}[${expressionCounter}]`);
        insertedValue = insertedValue.substr(cutAssignedExpression.length);
        expressionCounter++;
        
    } while ( (insertedValue.length > 0) && (insertedValue.includes('span')));
}

function findClosingSpan(expr) {
    let depth = 0;
    let closingSpan;
    let openingSpansIndex = 0;
    let closingSpansIndex = 0;
    let openingSpans = findAllSubstrings(expr, `<span`);
    let closingSpans = findAllSubstrings(expr, `</span>`);
    let iteration = 0;
    do {
        if (openingSpans[openingSpansIndex] < closingSpans[closingSpansIndex]) {
            depth++;
            openingSpansIndex++;
        } else {
            depth--;
            closingSpan = closingSpans[closingSpansIndex];
            closingSpansIndex++;         
        }
        iteration++;
    } while ( depth != 0 && iteration < 100);
    return closingSpan;
}

function findAllSubstrings(string, substring) {
    let indexTable = [];
    let prevValue = 0;
    if (string.includes(substring)) {
        do {
            indexTable.push(string.indexOf(substring, prevValue));
            prevValue = string.indexOf(substring, prevValue) + 1;
        } while (string.lastIndexOf(substring) != prevValue-1);
    }
    return indexTable;  
}


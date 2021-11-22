let result;
let resultDepth;

function calculate(expression){
  try {
    let currentPosition = 0;  // Current position in array, ex: expression[4][2][currentPosition]
    let currentDepth = '';    // Current array depth, ex: expression[currentDepth][0]

    do {
      currentPosition = 0;
      let currentTable = expression;

      let a = [],
        i = -1;
      while ((i = currentDepth.indexOf('[', i + 1)) >= 0) a.push(i);

      currentDepth = currentDepth.substring(0, currentDepth.length - (currentDepth.length - a[a.length - 1]));

      let currentOuterTable = eval(`expression${currentDepth}`);

      do {
        currentTable = eval(`expression${currentDepth}[${currentPosition}]`);

        // Jeżeli sprawdzana wartość jest tablicą, należy do niej wejść i sprawdzić czy w niej są tablice, itd.
        if (Array.isArray(currentTable)) {
          currentOuterTable = currentTable; // Przed wejściem do tablicy zapisywana jest sama zewznętrza tablica, aby potem można łatwo było się do niej odnieść
          currentDepth = `${currentDepth}[${currentPosition}]`; // "Zmiana "głębokości"
          currentPosition = 0;  // Wyzerowanie, aby nową "warstwę" tablicy sprawdzać od początku
        } else {
          currentPosition++; // Jeżeli element nie jest tablicą to sprawdź kolejny
        }
      } while (currentPosition !== currentOuterTable.length); // Jeżeli w tablicy nie ma tablic, to można ją zsumować
      resultDepth = currentDepth.substring(1, currentDepth.length - 1);
      if (resultDepth == '') { // Przy zerowej "warstwie" resultDepth wynosi nic
        resultDepth = '0';
      }

      // Właściwe zsumowanie tablicy i zamiana jej na jeden element

      // Join łączy wszystkie elementy tablicy, ale pozostawia w niej przecinki - replace je usuwa, następnie całość jest obliczana przy użyciu eval
      // Potem ta suma jest wstawiana w miejsce całej tablicy
      if (eval(`expression[${resultDepth}][0]`) == 'calculate') {
        const type = eval(`expression[${resultDepth}][1]`);
        if (operation(type) === false) { return; } // In case of error stop the exectution
        eval(`expression[${resultDepth}] = operation(type)`);
      } else {
        currentOuterTable = currentOuterTable.join();
        currentOuterTable = currentOuterTable.replace(/,/g, '');
        currentOuterTable = currentOuterTable.replace(/--/g, "+"); // Two subtractions next to each other = addition
        eval(`expression[${resultDepth}] = currentOuterTable`);
      }

      // Loop ends when it will reach the end of array and array itself will be one-dimensional+
    } while (!((currentPosition == expression.length && currentDepth == '')));

    const operations = [`-`, `+`, `*`, `/`];
    const operations_special = [`*`, `/`];
    if (operations_special.includes(expression[0].charAt(0))) { // First character
      toastMessage(`Błąd: działanie nie może zaczynać się operacją`);
      return false;
    } else if (operations.includes(expression[0].slice(-1))) { // Last character
      toastMessage(`Błąd: działanie nie może kończyć się operacją`);
      return false;
    }

    result = eval(expression[0]);
    result = parseFloat(result.toFixed(rounding_number));
    result = result.toString();
    resultAnimation(result);
  } catch (err) {
    toastMessage(`Błąd: nieprawidłowe umieszczenie operacji lub kropki. Sprawdź swoje działanie i spróbuj ponownie.`, 6000);
    console.error(`Treść błędu: ${err}`);
    return;
  }
}

function operation(type) {
  try {
  let x = eval(`expression[${resultDepth}][2]`);
  let y = eval(`expression[${resultDepth}][3]`);
  let output = '';
  switch (type) {
    case 'x':
      if (type == 'x' && eval(`expression[${parentsAreBrackets()}]`) == 'bra') {
        let calcIteration = 2;
        do {
          output += eval(`expression[${resultDepth}][${calcIteration}]`);
          calcIteration++;
        } while (eval(`expression[${resultDepth}][${calcIteration}]`) !== undefined);
        const operations = [`-`, `+`, `*`, `/`];
        const operations_special = [`*`, `/`];
        
        if (operations_special.includes(output.charAt(0))) { // First character
          toastMessage(`Błąd: działanie nie może zaczynać się operacją`);
          return false;
        } else if (operations.includes(output.slice(-1))) { // Last character
          toastMessage(`Błąd: działanie nie może kończyć się operacją`);
          return false;
        }
        output = eval(output);
      } else {
        output = x;
      }
      break;
    case 'y':
      output = x;
      break;
    case 'pow': // power
        output = Math.pow(x, y);
      break;
    case 'rad': // radical
      if ( y < 0) {
        toastMessage(`Błąd: wartość y w pierwiastku jest ujemna`);
        return false;
      } else {
        x = 1 / x;
        output = Math.pow(y, x);
      }
      break;
    case 'ran': // random
      if ( y < x) {
        toastMessage(`Błąd: wartość x nie może być większa od wartości y w generatorze losowych liczb.`);
        return false;
      }
      output = Math.floor(Math.random() * (y - x + 1) + x);
      break;
    case 'abs': // absolute
      output = Math.abs(x);
      break;
    case 'fac': // factorial
                // https://math.stackexchange.com/questions/1667023/factorial-calculation-for-non-integers
      x = parseFloat(x);
      if (Number.isInteger(x)){
          function rFact(num) {
            if (num === 0) { return 1; }
            else { return num * rFact(num - 1); }
          }
          output = rFact(x);
        } else {
          x++;
          var g = 7;
          var C = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];

          function gamma(z) {

            if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
            else {
              z -= 1;

              var x = C[0];
              for (var i = 1; i < g + 2; i++)
                x += C[i] / (z + i);

              var t = z + g + 0.5;
              return Math.sqrt(2 * Math.PI) * Math.pow(t, (z + 0.5)) * Math.exp(-t) * x;
            }
          }

        output = gamma(x);
      }
      break;
    case 'tan':
      if ( useRadians ) {
        output = Math.tan(x);
      } else {
        output = Math.tan(x * Math.PI / 180);
      }
      break;
    case 'sin':
      if (useRadians) {
        output = Math.sin(x);
      } else {
        output = Math.sin(x * Math.PI / 180);
      }
      break;
    case 'cos':
      if (useRadians) {
        output = Math.cos(x);
      } else {
        output = Math.cos(x * Math.PI / 180);
      }    
      break;
    case 'log':
      if ( x < 0 ){
        toastMessage(`Błąd: wartość logarytmu x jest ujemna`);
        return false;
      } else if ( y < 0 ){
        toastMessage(`Błąd: wartość logarytmu y jest ujemna`);
        return false;
      } else if ((x == 1 && y == 1)) {
        toastMessage(`Błąd: wartość logarytmu x i y wynosi 1`);
        return false;
      } else {
        output = Math.log(y) / Math.log(x);
      }
      break;
    case 'bra':
      output = (x);
      break;
    case 'num':
      output = x;
      break;
  }
  return output;
  } catch (err) {
    toastMessage(`Błąd: nieprawidłowe umieszczenie operacji lub kropki. Odświerz stronę, sprawdź swoje działanie i spróbuj ponownie.`);
    console.error(`Treść błędu: ${err}`);
    return;
  }
}

function parentsAreBrackets() {
  let trimmed = resultDepth;
  const lastOpening = trimmed.lastIndexOf("[");
  const trimmmedValue = trimmed.substr(lastOpening + 1) - 1;
  trimmed = trimmed.substr(0, lastOpening) + '[' + trimmmedValue;
  return trimmed;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function add(a, b) { return a + b; }
function mul(a, b) { return (a != 1 && b != 1) ? a * b : null; }
function sub(a, b) { return (a != b) ? a - b : null; }
function div(a, b) { return (a % b == 0 && b != 1) ? a / b : null; }

let ops = [add, sub, mul, div];
let signs = ["+", "-", "*", "/"];

function solve(values, target) {
  if (values.indexOf(target) >= 0) {
    return [];
  }
  if (values.length < 2) {
    return null;
  }


  for (let k = 0; k < ops.length; k++) {
    let op = ops[k];
    let sign = signs[k];

    for (let i = 0; i < values.length; i++) {
      for (let j = i+1; j < values.length; j++) {
        let a = Math.max(values[i], values[j]);
        let b = Math.min(values[i], values[j]);
        let res = op(a, b);
        if (!res) {
          continue;
        }
        let solution = solve([res].concat(values.slice(0, i), values.slice(i+1, j), values.slice(j+1)), target);
        if (solution !== null) {
          return [`${a} ${sign} ${b} = ${res}`].concat(solution);
        }
      }
    }
  }

  return null;
}

onmessage = function(e) {
  let target = e.data.pop();
  let values = e.data;

  let solution = solve(values, target);
  console.log(`Target:[${target}] Solution:[${solution.join(" ; ")}]`);
  postMessage(solution);
}

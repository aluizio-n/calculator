let count = [];
let saveAction;

const MAX_VISOR_CHAR = 10;

function CalcAction(action) {
  var currentNumber = document.getElementById("total").innerHTML;

  if (currentNumber.length === 0) {
    return;
  }

  count.push(Number(document.getElementById("total").innerHTML));

  if (currentNumber.split("")[currentNumber.length - 1] == ".") {
    document.getElementById("last-calc").removeAttribute("hidden");
    document.getElementById("last-calc").innerHTML += ` ${
      document.getElementById("total").innerHTML
    }0 ${action}`;
  } else {
    document.getElementById("last-calc").removeAttribute("hidden");
    document.getElementById("last-calc").innerHTML += ` ${
      document.getElementById("total").innerHTML
    } ${action}`;
  }

  document.getElementById("total").innerHTML = "";

  count.push(action);
}

function AddComma() {
  var currentNumber = document.getElementById("total").innerHTML;

  if (currentNumber == "") {
    document.getElementById("total").removeAttribute("hidden");
    document.getElementById("total").innerHTML = "0.";
  } else if (!currentNumber.includes(".")) {
    document.getElementById("total").innerHTML += ".";
  }
}

function Result() {
  currentAccum = document.getElementById("last-calc").innerHTML;
  currentNumber = document.getElementById("total").innerHTML;

  if (
    currentAccum[currentAccum.length - 1] === "=" &&
    currentNumber.length > 0
  ) {
    document.getElementById("total").innerHTML = ProcessAction(
      Number(currentNumber),
      Number(currentNumber),
      saveAction
    )
      .toString()
      .substring(0, MAX_VISOR_CHAR);
  }

  if (count.length === 0) {
    return;
  }

  count.push(Number(document.getElementById("total").innerHTML));
  document.getElementById("last-calc").innerHTML += ` ${
    document.getElementById("total").innerHTML
  } `;
  ProccessResult();
}

function ProccessResult() {
  let action = null;
  let current = null;

  let total = 0;

  if (isNaN(count[count.length - 1])) {
    count.pop();
  }

  count.forEach((n) => {
    if (!isNaN(n)) {
      if (current == null) {
        current = n;
      } else {
        total += ProcessAction(current, n, action);
        current = null;
      }
    } else {
      action = n;
      saveAction = n;
    }
  });

  if (current != null) {
    total = ProcessAction(total, current, action);
  }

  document.getElementById("total").innerHTML = total
    .toString()
    .substring(0, MAX_VISOR_CHAR);
  count = [];
}

function ProcessAction(num1, num2, action) {
  switch (action) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "x":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
}

function CleanCurrentEntry() {
  document.getElementById("total").innerHTML = "";
}

function Percentage() {
  var currentNumber = document.getElementById("total").innerHTML;
  if (currentNumber != "") {
    document.getElementById("total").innerHTML =
      Number(document.getElementById("total").innerHTML) / 100;
  }
}

function AddNumber(num) {
  document.getElementById("total").removeAttribute("hidden");
  if (document.getElementById("total").innerHTML.length < MAX_VISOR_CHAR) {
    document.getElementById("total").innerHTML += num;
  }
}

function CleanAll() {
  document.getElementById("total").innerHTML = "";
  document.getElementById("last-calc").innerHTML = "";
  count = [];
}

window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  let defaultAmount = document.getElementById("loan-amount").value = 100000;
  let defaultYears = document.getElementById("loan-years").value = 10;
  let defaultRate = document.getElementById("loan-rate").value = 4.7;

  update();

}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let monthly = calculateMonthlyPayment( getCurrentUIValues());
  updateMonthly(monthly);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let amount = values["amount"];
  let years = values["years"];
  let rate = values["rate"]/100;
  let iRate = rate/12;

  let monthlyPayment = (amount * iRate) / (1 - (Math.pow((1 + iRate), -(years * 12))));
  
  // creating two decimal places
  monthlyPayment *= 100;
  monthlyPayment = Math.round(monthlyPayment);
  monthlyPayment /= 100;

  return monthlyPayment;

}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let display = document.getElementById("monthly-payment").innerText = monthly;
}

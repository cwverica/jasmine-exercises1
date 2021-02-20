let billAmtInput = document.getElementById('billAmt');
let tipAmtInput = document.getElementById('tipAmt');
let paymentForm = document.getElementById('paymentForm');

let paymentTbody = document.querySelector('#paymentTable tbody');
let summaryTds = document.querySelectorAll('#summaryTable tbody tr td');

let allPayments = {};
let paymentId = 0;

paymentForm.addEventListener('submit', submitPaymentInfo);

// Add a curPayment object to allPayments, update html and reset input values
function submitPaymentInfo(evt) {
  if (evt) evt.preventDefault(); // when running tests there is no event

  let curPayment = createCurPayment();

  if (curPayment) {
    paymentId += 1;

    allPayments['payment' + paymentId] = curPayment;

    updatePaymentTable()
    updateServerTable();
    updateSummary();

    billAmtInput.value = '';
    tipAmtInput.value = '';
  }
}

function removePayment(payment) {
  for (let i=0; i<Object.keys(allPayments).length; i++){
    if (allPayments[`payment${i+1}`].billAmt == payment){
      delete allPayments[`payment${i+1}`];
      if(i == Object.keys(allPayments).length){
        break;
      } else {
        // if(Object.keys(allPayments).length-i > 0){
        for(let j=i; j<Object.keys(allPayments).length; j++){
            allPayments[`payment${j+1}`] = allPayments[`payment${j+2}`];
          }
        // }
        delete allPayments[`payment${Object.keys(allPayments).length}`]
        break;
      }
    }
  }
  paymentId--;
}

// createCurPayment() will return undefined with negative or empty inputs
// positive billAmt is required but tip can be 0
function createCurPayment() {
  let billAmt = billAmtInput.value;
  let tipAmt = tipAmtInput.value;

  if (billAmt === '' || tipAmt === '') return;

  if (Number(billAmt) > 0 && Number(tipAmt) >= 0) {
    return {
      billAmt: billAmt,
      tipAmt: tipAmt,
      tipPercent: calculateTipPercent(billAmt, tipAmt),
    }
  }
}

// Create table row element and pass to appendTd with input value
function appendPaymentTable(curPayment) {
  let newTr = document.createElement('tr');
  newTr.id = 'payment' + paymentId;

  appendTd(newTr, '$' + curPayment.billAmt);
  appendTd(newTr, '$' + curPayment.tipAmt);
  appendTd(newTr, curPayment.tipPercent + '%');
  appendDeleteBtn(newTr, 'payment');

  paymentTbody.append(newTr);
}

function updatePaymentTable() {
  paymentTbody.innerHTML = '';

  for (let key in allPayments) {

    let newTr = document.createElement('tr');
    newTr.setAttribute('id', key);

    appendTd(newTr, '$' + allPayments[key].billAmt);
    appendTd(newTr, '$' + allPayments[key].tipAmt);
    appendTd(newTr, allPayments[key].tipPercent + '%');
    appendDeleteBtn(newTr, 'payment');
  
    paymentTbody.append(newTr);
  }
}

// Create table row element and pass to appendTd with calculated sum of all payment
function updateSummary() {
  let tipPercentAvg;
  let paymentTotal = sumPaymentTotal('tipPercent');
  let numberOfPayments = Object.keys(allPayments).length;

  if (paymentTotal === 0 && numberOfPayments === 0) {
    tipPercentAvg = 0;
  } else {
    tipPercentAvg = (sumPaymentTotal('tipAmt')/sumPaymentTotal('billAmt'))*100;
  }

  summaryTds[0].innerHTML = '$' + sumPaymentTotal('billAmt');
  summaryTds[1].innerHTML = '$' + sumPaymentTotal('tipAmt');
  summaryTds[2].innerHTML =  Math.round(tipPercentAvg) + '%';
}


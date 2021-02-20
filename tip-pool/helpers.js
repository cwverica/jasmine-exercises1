
// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;

  tr.append(newTd);
}

// expects a table row element, appends a td element that serves as a remove button
function appendDeleteBtn(tr, targetParent) {
  let newTd = document.createElement('td');
  newTd.innerText = "X";
  if(targetParent == 'server'){
    newTd.addEventListener('click', function (e) {
      const server = e.target.parentElement.firstElementChild.innerText;
      removeServer(server);
      // e.target.parentElement.remove();  
      updateServerTable();
    });
  }
  if(targetParent == 'payment'){
    newTd.addEventListener('click', function (e) {
      let payment = e.target.parentElement.firstElementChild.innerText;
      payment = payment.slice(1);
      removePayment(payment);
      updatePaymentTable();
      updateServerTable();
      updateSummary();
    });  
  }
  tr.append(newTd);
}

describe("Payments test (with setup and tear-down)", function() {
    beforeEach(function () {
        billAmtInput.value = "120.00";
        tipAmtInput.value = "12.00";
        // allPayments = {
        //     payment1: {billAmt: "620.00", tipAmt: "100", tipPercent: 16},
        //     payment2: {billAmt: "14.14", tipAmt: "1.41", tipPercent: 10},
        //     payment3: {billAmt: "10.01", tipAmt: "5", tipPercent: 50}
        // };
        // curPayment = {billAmt: "500.00", tipAmt: "125.00", tipPercent: 25};

      // initialization logic
    });
    
    it('should run everything smoothly', function () {
        //submitPaymentInfo
        submitPaymentInfo();
        
        //createCurPayment
        
       
        //appendPaymentTable
        expect(document.getElementById("payment1")).toBeTruthy();
        let curPayment = {billAmt: "620.00", tipAmt: "100", tipPercent: 16};
        paymentId++;
        appendPaymentTable(curPayment);
        expect(document.querySelector("#paymentTable tbody").innerHTML).toContain('id="payment2"');

        //updateSummary
        expect(summaryTds[0].innerHTML).toEqual("$120");
        expect(summaryTds[1].innerHTML).toEqual("$12");
        expect(summaryTds[2].innerHTML).toEqual("10%");
    });

    it('should have 3 payments after adding and deleting', function(){
      submitPaymentInfo();
      billAmtInput.value = "500";
      tipAmtInput.value = "100";
      submitPaymentInfo();
      billAmtInput.value = "150";
      tipAmtInput.value = "17";
      submitPaymentInfo();
      billAmtInput.value = "250";
      tipAmtInput.value = "40";
      submitPaymentInfo();
      
      removePayment(500);
      updateSummary();

      expect(Object.keys(allPayments).length).toEqual(3);
      expect(document.getElementById("payment2").innerHTML).toContain("500")

    });

  
    afterEach(function() {
        // tear-down and clean-up logic
        paymentId = 0;
        document.querySelector('#paymentTable tbody').innerHTML = "";
        allPayments = {};
        curPayment = {};
        updateSummary();
        billAmtInput.value = "";
        tipAmtInput.value = "";
    });
  });
  
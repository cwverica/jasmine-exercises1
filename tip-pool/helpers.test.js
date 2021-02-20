describe("Helpers test (with setup and tear-down)", function() {
    beforeEach(function () {
      // initialization logic
        allPayments = {
            payment1: {billAmt: "620.00", tipAmt: "100", tipPercent: 16},
            payment2: {billAmt: "14.14", tipAmt: "1.41", tipPercent: 10},
            payment3: {billAmt: "10.01", tipAmt: "5", tipPercent: 50}
        };
    });

    it('should calculate tip percentage correctly', function () {
        expect(calculateTipPercent(120, 12)).toEqual(10);
        expect(calculateTipPercent(600, 15)).toEqual(3);
    });

    it('should use all parts of the sumPaymentTotal correctly', function (){
        expect(sumPaymentTotal("billAmt")).toEqual(644.15);
        expect(sumPaymentTotal("tipAmt")).toEqual(106.41);
        expect(sumPaymentTotal("tipPercent")).toEqual(76);
    });

    it('should add td to tr', function () {
        let testTr = document.createElement('tr');
        appendTd(testTr, "Hello!")
        expect(testTr.innerHTML).toEqual("<td>Hello!</td>");
    });
  
    afterEach(function() {
      // tear-down and clean-up logic
        delete testTr;
        allPayments = {};

    });
  });
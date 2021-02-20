
it('should calculate the monthly rate correctly', function () {
  
  expect(calculateMonthlyPayment({amount: 125000, years: 7, rate: 4.6})).toEqual(1743.34);
  expect(calculateMonthlyPayment({amount: 500000, years: 30, rate: 4.9})).toEqual(2653.63);
});


it("should return a result with 2 decimal places", function() {
  expect((Math.round(100*(calculateMonthlyPayment({
    amount: 125000,
    years: 7,
    rate: 4.6}))))/100)
    .toEqual(calculateMonthlyPayment({amount: 125000, years: 7, rate: 4.6}))
});

/// etc

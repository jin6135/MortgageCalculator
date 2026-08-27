import './style.css'

const monthlyMortgageAmt = document.getElementById('M');
const principal = document.getElementById('P');
const monthlyInterestRate = document.getElementById('r');
const totalNumMonthlyPayments = document.getElementById('n');

const amortization = document.getElementById("amortization");
const amortizationValue = document.getElementById("amortization-value");

amortization.addEventListener("input", function () {
  amortizationValue.textContent = amortization.value;
});

const amortizationYears = Number(amortization.value);
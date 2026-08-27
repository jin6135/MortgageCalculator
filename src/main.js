import './style.css'

const monthlyMortgageAmt = document.getElementById('M');
const principal = document.getElementById('P');
const monthlyInterestRate = document.getElementById('r');
const totalNumMonthlyPayments = document.getElementById('n');

const input = document.getElementById('currency-input');

input.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, "");

    value=(value/100).toFixed(2);

    e.target.value = new Intl.NumberFormat('en-US', {
        minimumFractionDigits:2,
        maximumFractionDigits:2
    }).format(value);
})
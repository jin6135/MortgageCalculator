import './style.css'

const form = document.getElementById("mortgage-form");

const amortization = document.getElementById("amortization");
const homePrice = document.getElementById("home-price");
const downPayment = document.getElementById("down-payment");
const interestRate = document.getElementById("interest-rate");
const paymentFrequency = document.getElementById("payment-frequency");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const price = Number(homePrice.value);
  const down = Number(downPayment.value);
  const annualRate = Number(interestRate.value);
  const years = Number(amortization.value);
  const frequency = Number(paymentFrequency.value);

  /* calculations */
  const principal = price - down;
  const r = Math.pow(
    1 + (annualRate / 100) / 2,
    2 / frequency
  ) - 1;
  const n = years * frequency;

  const M = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  console.log("Principal:", principal);
  console.log("r:", r);
  console.log("n:", n);
  console.log("Mortgage Payment:", M);
});


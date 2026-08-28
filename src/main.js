import './style.css'

const form = document.getElementById("mortgage-form");

const amortization = document.getElementById("amortization");
const homePrice = document.getElementById("home-price");
const downPayment = document.getElementById("down-payment");
const interestRate = document.getElementById("interest-rate");
const paymentFrequency = document.getElementById("payment-frequency");
const nonTraditional = document.getElementById("non-traditional");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const price = Number(homePrice.value);
  const down = Number(downPayment.value);
  const annualRate = Number(interestRate.value);
  const years = Number(amortization.value);
  const frequency = Number(paymentFrequency.value);

  /* Calculations */
  const principal = price - down;

  /* Canada uses semi-annual compounding, which is found in the equation below */
  const r = Math.pow(
    1 + (annualRate / 100) / 2,
    2 / frequency
  ) - 1;

  const n = years * frequency;

  /* CMHC sometimes gives a premium, which is why we need to check the loanToValue amount */
  const loanToValue = principal / price;

  let insuranceRate = 0;
  if (loanToValue > 0.80) {
    if (loanToValue <= 0.85) {
      insuranceRate = 0.0280;
    } else if (loanToValue <= 0.90) {
      insuranceRate = 0.0310;
    } else if (loanToValue <= 0.95) {
      insuranceRate = nonTraditional.checked
        ? 0.0450
        : 0.0400;
    }
  }

  const insurancePremium = principal * insuranceRate;
  const insurancePrincipal = principal + insurancePremium;


  const M = insurancePrincipal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const results = document.getElementById("results");

  const monthlyPayment = document.getElementById("payment-amount");
  const paymentLabel = document.getElementById("payment-label");
  const mortgageAmount = document.getElementById("mortgage-amount");
  const resultDownPayment = document.getElementById("result-down-payment");
  const loanToValueResult = document.getElementById("loan-to-value");
  const insurancePremiumResult = document.getElementById("insurance-premium");

  const money = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD"
  });

  const percent = new Intl.NumberFormat("en-CA", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  monthlyPayment.textContent = money.format(M);

  paymentLabel.textContent =
    frequency === 12 ? "/ Monthly" :
    frequency === 26 ? "/ Bi-weekly" :
    "/ Weekly";

  mortgageAmount.textContent = money.format(insurancePrincipal);
  resultDownPayment.textContent = money.format(down);
  loanToValueResult.textContent = percent.format(loanToValue);
  insurancePremiumResult.textContent = money.format(insurancePremium);
  results.classList.remove("hidden");

});


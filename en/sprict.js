const fetchRateBtn = document.getElementById('fetchRateBtn');
const errorArea = document.getElementById('errorArea');
const resultArea = document.getElementById('resultArea');

function showCalcError(msg) {
  errorArea.textContent = msg;
}
function clearCalcError() {
  errorArea.textContent = '';
}

fetchRateBtn.onclick = function() {
  clearCalcError();
  resultArea.textContent = '';
  const amount = parseFloat(document.getElementById('amountInput').value);
  const from = document.getElementById('fromCurrency').value;
  const to = document.getElementById('toCurrency').value;

  if (isNaN(amount)) {
    showCalcError("Please enter an amount");
    return;
  }
  if (from === to) {
    showCalcError("Conversion between the same currencies is unnecessary");
    return;
  }
  resultArea.textContent = 'Fetching exchange rate...';

  fetch(`https://open.er-api.com/v6/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      if (data.result === "success" && data.rates && data.rates[to]) {
        const rate = data.rates[to];
        const converted = (amount * rate).toFixed(2);
        resultArea.textContent = `${amount} ${from} = ${converted} ${to} (Rate: ${rate})`;
      } else {
        showCalcError('Failed to fetch exchange rate');
      }
    })
    .catch(() => {
      showCalcError('Network error: Unable to fetch exchange rate');
    });
};

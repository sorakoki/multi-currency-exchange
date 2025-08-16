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
    showCalcError("金額を入力してください");
    return;
  }
  if (from === to) {
    showCalcError("同じ通貨間での変換は不要です");
    return;
  }
  resultArea.textContent = 'レート取得中...';

  fetch(`https://open.er-api.com/v6/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      if (data.result === "success" && data.rates && data.rates[to]) {
        const rate = data.rates[to];
        const converted = (amount * rate).toFixed(2);
        resultArea.textContent = `${amount} ${from} = ${converted} ${to}（レート: ${rate}）`;
      } else {
        showCalcError('為替レートの取得に失敗しました');
      }
    })
    .catch(() => {
      showCalcError('通信エラー：為替レートを取得できません');
    });
};


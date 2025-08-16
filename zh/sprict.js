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
    showCalcError("请输入金额");
    return;
  }
  if (from === to) {
    showCalcError("相同货币之间的转换是不必要的");
    return;
  }
  resultArea.textContent = '正在获取汇率...';

  fetch(`https://open.er-api.com/v6/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      if (data.result === "success" && data.rates && data.rates[to]) {
        const rate = data.rates[to];
        const converted = (amount * rate).toFixed(2);
        resultArea.textContent = `${amount} ${from} = ${converted} ${to} （汇率: ${rate}）`;
      } else {
        showCalcError('获取汇率失败');
      }
    })
    .catch(() => {
      showCalcError('网络错误：无法获取汇率');
    });
};

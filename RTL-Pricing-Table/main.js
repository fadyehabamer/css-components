const prices = {
  SAR: { basic: 39, pro: 99, business: 249 },
  EGP: { basic: 399, pro: 999, business: 2499 }
};

const billing = document.getElementById('billing');
const currency = document.getElementById('currency');
const formatters = {};

function formatter(code) {
  if (!formatters[code]) {
    formatters[code] = new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: code,
      maximumFractionDigits: 0
    });
  }
  return formatters[code];
}

function splitPrice(value, code) {
  const parts = formatter(code).formatToParts(value);
  const amount = parts
    .filter((part) => ['integer', 'group', 'decimal', 'fraction'].includes(part.type))
    .map((part) => part.value)
    .join('');
  const symbol = parts.find((part) => part.type === 'currency');
  return { amount, symbol: symbol ? symbol.value : code };
}

function render() {
  const yearly = billing.querySelector('input:checked').value === 'yearly';
  const code = currency.querySelector('input:checked').value;

  document.querySelectorAll('.plan').forEach((plan) => {
    const monthly = prices[code][plan.dataset.plan];
    const total = yearly ? monthly * 10 : monthly;
    const price = splitPrice(total, code);

    plan.querySelector('.amount').textContent = price.amount;
    plan.querySelector('.currency').textContent = price.symbol;
    plan.querySelector('.period').textContent = yearly ? '/ سنويًا' : '/ شهريًا';
    plan.querySelector('.plan-note').textContent = yearly
      ? 'يعادل ' + formatter(code).format(Math.round(total / 12)) + ' شهريًا'
      : '';
  });
}

billing.addEventListener('change', render);
currency.addEventListener('change', render);
render();
